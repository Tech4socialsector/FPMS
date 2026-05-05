import frappe
from frappe.model.document import Document

class AnnoucementsDetail(Document):
    pass

# 
# import frappe
# # # from frappe.model.document import Document
# # # from frappe.utils import get_url


# # # class AnnoucementsDetail(Document):

# # #     def after_insert(self):
# # #         send_announcement_email(self)


# # # def send_announcement_email(doc):
# # #     recipients = []

# # #     # ----------------------------------------
# # #     # 1️⃣ Collect Faculty Emails
# # #     # ----------------------------------------
# # #     for row in doc.faculty_name:
# # #         faculty_email = frappe.db.get_value("Faculty", row.faculty, "email")
# # #         if faculty_email:
# # #             recipients.append(faculty_email)

# # #     # ----------------------------------------
# # #     # 2️⃣ Collect Supervisor Emails
# # #     # ----------------------------------------
# # #     for row in doc.supervisor_name:
# # #         supervisor_email = frappe.db.get_value("Supervisor", row.supervisor, "email")
# # #         if supervisor_email:
# # #             recipients.append(supervisor_email)

# # #     # Remove duplicate emails
# # #     recipients = list(set(recipients))

# # #     if not recipients:
# # #         frappe.msgprint("⚠️ No email IDs found to send announcement.")
# # #         return

# # #     # ----------------------------------------
# # #     # 3️⃣ Subject, Year & Link
# # #     # ----------------------------------------
# # #     subject = "Creation of FPMS form"
# # #     year = doc.academic_year or "2025-2026"
# # #     base_url = get_url()

# # #     # ----------------------------------------
# # #     # 4️⃣ Send Email to Each Faculty
# # #     # ----------------------------------------
# # #     for email in recipients:

# # #         faculty_details = frappe.db.get_value(
# # #             "Faculty",
# # #             {"email": email},
# # #             ["faculty_name", "emp_code"],
# # #             as_dict=True
# # #         ) or {}

# # #         first_name = faculty_details.get("faculty_name") or "Faculty Member"
# # #         emp_code = faculty_details.get("emp_code") or "-"

# # #         # Create unique token for this recipient
# # #         token = frappe.generate_hash(length=32)
        
# # #         # Store data in cache (expires in 30 days)
# # #         frappe.cache().set_value(
# # #             f"tracker_token:{token}",
# # #             {
# # #                 "announcement": doc.name,
# # #                 "academic_year": doc.academic_year,
# # #                 "email": email,
# # #                 "faculty_name": first_name,
# # #                 "emp_code": emp_code
# # #             },
# # #             expires_in_sec=30 * 24 * 60 * 60
# # #         )

# # #         # Link that creates tracker automatically
# # #         tracker_url = f"{base_url}/api/method/fpms.fpms.fpmss_masster.doctype.annoucements_detail.annoucements_detail.open_engagement_tracker?token={token}"

# # #         # ----------------------------------------
# # #         # ✉️ EMAIL CONTENT
# # #         # ----------------------------------------
# # #         message = f"""
# # # <p>Dear {first_name},</p>

# # # <p>
# # # The FPMS form <b>{first_name}</b> (Employee Code: <b>{emp_code}</b>)
# # # for the year <b>{year}</b> has been created in the Frappe FPMS system.
# # # </p>

# # # <p>
# # # Please use the link below to navigate to the document and to start setting
# # # your Objectives and engagement details:
# # # </p>

# # # <p>
# # # <a href="{tracker_url}">{tracker_url}</a>
# # # </p>

# # # <p><i>(Please do not respond to this automatic notification)</i></p>

# # # <p>
# # # In case of any query please write to
# # # <a href="mailto:fpmssupport@apu.edu.in">fpmssupport@apu.edu.in</a>
# # # </p>

# # # <p>
# # # Regards,<br>
# # # <b>People Function</b>
# # # </p>
# # # """

# # #         frappe.sendmail(
# # #             recipients=[email],
# # #             subject=subject,
# # #             message=message
# # #         )

# # #     frappe.msgprint("✅ FPMS Creation email sent successfully!")


# # # # ------------------------------------------------------------
# # # # ⭐ OPEN ENGAGEMENT TRACKER (AUTO-CREATE WITH VALUES)
# # # # ------------------------------------------------------------
# # # @frappe.whitelist(allow_guest=True)
# # # def open_engagement_tracker(token):
# # #     """
# # #     Opens or creates Engagement Tracker with pre-filled values.
# # #     Pure Python - no client script needed!
# # #     """
# # #     # Get stored data
# # #     data = frappe.cache().get_value(f"tracker_token:{token}")
    
# # #     if not data:
# # #         frappe.respond_as_web_page(
# # #             "Link Expired",
# # #             "This link has expired or is invalid. Please contact fpmssupport@apu.edu.in",
# # #             http_status_code=404
# # #         )
# # #         return
    
# # #     # Check if user is logged in
# # #     if frappe.session.user == "Guest":
# # #         # Redirect to login with return URL
# # #         frappe.local.response["type"] = "redirect"
# # #         frappe.local.response["location"] = f"/login?redirect-to=/api/method/fpms.fpms.fpmss_masster.doctype.annoucements_detail.annoucements_detail.open_engagement_tracker?token={token}"
# # #         return
    
# # #     # Check if tracker already exists for this user + announcement
# # #     existing_tracker = frappe.db.exists(
# # #         "Engagement Tracker",
# # #         {
# # #             "announcement": data.get("announcement"),
# # #             "academic_year": data.get("academic_year"),
# # #             "owner": frappe.session.user
# # #         }
# # #     )
    
# # #     if existing_tracker:
# # #         # Open existing tracker
# # #         frappe.local.response["type"] = "redirect"
# # #         frappe.local.response["location"] = f"/app/engagement-tracker/{existing_tracker}"
# # #         return
    
# # #     # Create new tracker with pre-filled values
# # #     tracker = frappe.get_doc({
# # #         "doctype": "Engagement Tracker",
# # #         "announcement": data.get("announcement"),
# # #         "academic_year": data.get("academic_year"),
# # #         "employee_name": data.get("faculty_name"),
# # #         "employee_id": data.get("emp_code"),
# # #     })
    
# # #     try:
# # #         tracker.insert(ignore_permissions=True)
# # #         frappe.db.commit()
        
# # #         # Redirect to the newly created tracker
# # #         frappe.local.response["type"] = "redirect"
# # #         frappe.local.response["location"] = f"/app/engagement-tracker/{tracker.name}"
        
# # #     except Exception as e:
# # #         frappe.log_error(f"Error creating Engagement Tracker: {str(e)}")
# # #         frappe.respond_as_web_page(
# # #             "Error",
# # #             f"Could not create tracker. Please contact fpmssupport@apu.edu.in<br>Error: {str(e)}",
# # #             http_status_code=500
# # #         )


# import frappe
# from frappe.model.document import Document
# from frappe.utils import get_url


# class AnnoucementsDetail(Document):

#     def after_insert(self):
#         send_announcement_email(self)


# # ============================================================
# # ✉️ SEND ANNOUNCEMENT EMAIL
# # ============================================================
# def send_announcement_email(doc):

#     recipients = []

#     # ------------------------------------------------
#     # 1️⃣ Collect Faculty Emails
#     # ------------------------------------------------
#     for row in doc.faculty_name or []:
#         email = frappe.db.get_value("Faculty", row.faculty, "email")
#         if email:
#             recipients.append(email)

#     # ------------------------------------------------
#     # 2️⃣ Collect Supervisor Emails
#     # ------------------------------------------------
#     for row in doc.supervisor_name or []:
#         email = frappe.db.get_value("Supervisor", row.supervisor, "email")
#         if email:
#             recipients.append(email)

#     recipients = list(set(recipients))

#     if not recipients:
#         frappe.msgprint("⚠️ No email IDs found")
#         return

#     subject = "Creation of FPMS Form"
#     base_url = get_url()
#     year = doc.academic_year or "2025-2026"

#     # ------------------------------------------------
#     # 3️⃣ Send Email
#     # ------------------------------------------------
#     for email in recipients:

#         faculty = frappe.db.get_value(
#             "Faculty",
#             {"email": email},
#             ["faculty_name", "emp_code"],
#             as_dict=True
#         ) or {}

#         faculty_name = faculty.get("faculty_name") or "Faculty Member"
#         emp_code = faculty.get("emp_code") or "-"

#         # 🔑 Generate token
#         token = frappe.generate_hash(length=32)

#         # 🔐 Store token data
#         frappe.cache().set_value(
#             f"tracker_token:{token}",
#             {
#                 "announcement": doc.name,
#                 "academic_year": doc.academic_year,
#                 "faculty_name": faculty_name,
#                 "emp_code": emp_code,
#                 "email": email
#             },
#             expires_in_sec=30 * 24 * 60 * 60
#         )

#         tracker_url = (
#             f"{base_url}/api/method/"
#             f"fpms.fpms.fpmss_masster.doctype."
#             f"annoucements_detail.annoucements_detail."
#             f"open_engagement_tracker?token={token}"
#         )

#         message = f"""
#         <p>Dear {faculty_name},</p>

#         <p>
#         Your FPMS form for the academic year <b>{year}</b> has been created.
#         </p>

#         <p>
#         Click the link below to open your Engagement Tracker:
#         </p>

#         <p>
#         <a href="{tracker_url}">{tracker_url}</a>
#         </p>

#         <p><i>This is an automated email. Please do not reply.</i></p>

#         <p>
#         Regards,<br>
#         <b>People Function</b>
#         </p>
#         """

#         frappe.sendmail(
#             recipients=[email],
#             subject=subject,
#             message=message
#         )

#     frappe.msgprint("✅ Announcement email sent successfully")


# # ============================================================
# # ⭐ OPEN / CREATE ENGAGEMENT TRACKER
# # ============================================================
# @frappe.whitelist(allow_guest=True)
# def open_engagement_tracker(token):

#     data = frappe.cache().get_value(f"tracker_token:{token}")

#     if not data:
#         frappe.respond_as_web_page(
#             "Link Expired",
#             "This link has expired. Please contact fpmssupport@apu.edu.in",
#             http_status_code=404
#         )
#         return

#     # 🔐 Redirect guest to login
#     if frappe.session.user == "Guest":
#         frappe.local.response["type"] = "redirect"
#         frappe.local.response["location"] = (
#             f"/login?redirect-to=/api/method/"
#             f"fpms.fpms.fpmss_masster.doctype."
#             f"annoucements_detail.annoucements_detail."
#             f"open_engagement_tracker?token={token}"
#         )
#         return

#     # ------------------------------------------------
#     # 1️⃣ Check existing tracker
#     # -------------------------------------------
#     existing = frappe.db.exists(
#         "Engagement Tracker",
#         {
#             "announcement": data["announcement"],
#             "academic_year": data["academic_year"],
#             "employee_id": data["emp_code"]
#         }
#     )

#     if existing:
#         frappe.local.response["type"] = "redirect"
#         frappe.local.response["location"] = f"/app/engagement-tracker/{existing}"
#         return

#     # ------------------------------------------------
#     # 2️⃣ Create tracker (AUTO-FILL WORKS HERE)
#     # ------------------------------------------------
#     tracker = frappe.get_doc({
#         "doctype": "Engagement Tracker",
#         "announcement": data["announcement"],
#         "academic_year": data["academic_year"],
#         "employee_name": data["faculty_name"],
#         "employee_id": data["emp_code"],
#         "owner": frappe.session.user
#     })

#     tracker.insert(ignore_permissions=True)
#     frappe.db.commit()

#     frappe.local.response["type"] = "redirect"
#     frappe.local.response["location"] = f"/app/engagement-tracker/{tracker.name}"


# import frappe
# from frappe.model.document import Document
# from frappe.utils import get_url


# class AnnoucementsDetail(Document):

#     def after_insert(self):
#         send_announcement_email(self)

#  # ============================================================
# # ✉️ SEND ANNOUNCEMENT EMAIL
# # ============================================================
# def send_announcement_email(doc):

#     recipients = []

#     # 1️⃣ Faculty Emails
#     for row in doc.faculty_name or []:
#         email = frappe.db.get_value("Faculty", row.faculty, "email")
#         if email:
#             recipients.append(email)

#     # 2️⃣ Supervisor Emails
#     for row in doc.supervisor_name or []:
#         email = frappe.db.get_value("Supervisor", row.supervisor, "email")
#         if email:
#             recipients.append(email)

#     recipients = list(set(recipients))
#     if not recipients:
#         return

#     subject = "Creation of FPMS Form"
#     base_url = get_url()
#     year = doc.academic_year or "2025-2026"

#     for email in recipients:

#         faculty = frappe.db.get_value(
#             "Faculty",
#             {"email": email},
#             ["faculty_name", "emp_code"],
#             as_dict=True
#         ) or {}

#         faculty_name = faculty.get("faculty_name") or "Faculty Member"
#         emp_code = faculty.get("emp_code") or "-"

#         token = frappe.generate_hash(length=32)

#         frappe.cache().set_value(
#             f"tracker_token:{token}",
#             {
#                 "announcement": doc.name,
#                 "academic_year": doc.academic_year,
#                 "faculty_name": faculty_name,
#                 "emp_code": emp_code,
#                 "email": email
#             },
#             expires_in_sec=30 * 24 * 60 * 60
#         )

#         # ✅ CORRECT APP NAME = fpms
#         tracker_url = (
#             f"{base_url}/api/method/"
#             f"fpms.doctype."
#             f"annoucements_detail.annoucements_detail."
#             f"open_engagement_tracker?token={token}"
#         )

#         message = f"""
#         <p>Dear {faculty_name},</p>

#         <p>Your FPMS form for the academic year <b>{year}</b> has been created.</p>

#         <p>
#         <a href="{tracker_url}">Click here to open your Engagement Tracker</a>
#         </p>

#         <p><i>This is an automated email.</i></p>

#         <p>Regards,<br><b>People Function</b></p>
#         """

#         frappe.sendmail(
#             recipients=[email],
#             subject=subject,
#             message=message
#         )


# # ============================================================
# # ⭐ OPEN / CREATE ENGAGEMENT TRACKER
# # ============================================================
# @frappe.whitelist(allow_guest=True)
# def open_engagement_tracker(token):

#     data = frappe.cache().get_value(f"tracker_token:{token}")

#     if not data:
#         frappe.respond_as_web_page(
#             "Link Expired",
#             "This link is invalid or expired.",
#             http_status_code=404
#         )
#         return

#     if frappe.session.user == "Guest":
#         frappe.local.response["type"] = "redirect"
#         frappe.local.response["location"] = (
#             f"/login?redirect-to=/api/method/"
#             f"fpms.doctype."
#             f"annoucements_detail.annoucements_detail."
#             f"open_engagement_tracker?token={token}"
#         )
#         return

#     existing = frappe.db.exists(
#         "Engagement Tracker",
#         {
#             "announcement": data["announcement"],
#             "academic_year": data["academic_year"],
#             "employee_id": data["emp_code"]
#         }
#     )

#     if existing:
#         frappe.local.response["type"] = "redirect"
#         frappe.local.response["location"] = f"/app/engagement-tracker/{existing}"
#         return

#     tracker = frappe.get_doc({
#         "doctype": "Engagement Tracker",
#         "announcement": data["announcement"],
#         "academic_year": data["academic_year"],
#         "employee_name": data["faculty_name"],
#         "employee_id": data["emp_code"],
#         "owner": frappe.session.user
#     })

#     tracker.insert(ignore_permissions=True)
#     frappe.db.commit()

#     frappe.local.response["type"] = "redirect"
#     frappe.local.response["location"] = f"/app/engagement-tracker/{tracker.name}"
