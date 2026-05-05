import frappe
from frappe.model.document import Document

class Announcement(Document):
    def after_insert(self):
        send_announcement_email(self)


def send_announcement_email(doc):
    recipients = []

    # ----------------------------------------
    # 1️⃣ Collect Faculty Emails
    # ----------------------------------------
    for row in doc.faculty_name:
        faculty_email = frappe.db.get_value("Faculty", row.faculty, "email")
        if faculty_email:
            recipients.append(faculty_email)

    # ----------------------------------------
    # 2️⃣ Collect Supervisor Emails
    # ----------------------------------------
    for row in doc.supervisor_name:
        supervisor_email = frappe.db.get_value("Supervisor", row.supervisor, "email")
        if supervisor_email:
            recipients.append(supervisor_email)

    recipients = list(set(recipients))

    if not recipients:
        frappe.msgprint("⚠️ No email IDs found to send announcement.")
        return

    subject = "Creation of FPMS form"
    year = doc.academic_year or "2025–2026"

    # ----------------------------------------
    # 3️⃣ Auto Detect URL (Local / Cloud)
    # ----------------------------------------
    base_url = frappe.utils.get_url()

    # Include academic_year + announcement_id in link
    tracker_url = (
        f"{base_url}/app/engagement-tracker"
        f"?academic_year={doc.academic_year}"
        f"&announcement_id={doc.announcement_id}"
    )

    # ----------------------------------------
    # 4️⃣ Send email to each user
    # ----------------------------------------
    for email in recipients:

        faculty_details = frappe.db.get_value(
            "Faculty",
            {"email": email},
            ["faculty_name", "emp_code", "faculty_id"],
            as_dict=True
        ) or {}

        first_name = faculty_details.get("faculty_name")
        emp_code = faculty_details.get("emp_code")
        faculty_id = faculty_details.get("faculty_id")

        message = f"""
<p>Dear {first_name or 'Faculty Member'},</p>

<p>
    The FPMS form <b>{doc.name}</b> 
    (Faculty ID: <b>{faculty_id or '-'}</b>,
    Emp Code: <b>{emp_code or '-'}</b>) 
    for the year <b>{year}</b> has been created in the FPMS system.
</p>

<p>Please use the button below to open your FPMS form:</p>

<p>
    <a href="{tracker_url}"
       style="
            background-color:#1a73e8;
            color:white;
            padding:10px 20px;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
            display:inline-block;
       "
       target="_blank">
       Open Engagement Tracker
    </a>
</p>

<p>If you have any queries, please email 
<a href="mailto:fpmssupport@apu.edu.in">fpmssupport@apu.edu.in</a></p>

<p><i>(This is an automated message — please do not reply.)</i></p>

<p>Regards,<br>
<b>People Function</b></p>
"""

        frappe.sendmail(
            recipients=[email],
            subject=subject,
            message=message
        )

    frappe.msgprint(f"✅ FPMS Intimation Mail sent to: {', '.join(recipients)}")