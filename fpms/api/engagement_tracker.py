import frappe

@frappe.whitelist(allow_guest=True)
def get_engagement_tracker_list():
    """Return full list of Engagement Tracker documents with all fields and child tables"""
    try:
        docs = frappe.get_all("Engagement Tracker", fields=["name"])
        result = []

        for d in docs:
            doc = frappe.get_doc("Engagement Tracker", d.name)
            result.append(doc.as_dict())  # includes all child tables & fields

        return result

    except Exception as e:
        frappe.log_error(message=str(e), title="Engagement Tracker Full List API Error")
        return {"error": str(e)}


# // Note: This API returns the full list of Engagement Tracker documents with all fields and child tables .
// It is intended for internal use and may be used by the Engagement Tracker React app to fetch data.