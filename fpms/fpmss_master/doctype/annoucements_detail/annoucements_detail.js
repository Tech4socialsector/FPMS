// // Copyright (c) 2025, Ram and contributors
// // For license information, please see license.txt
 
// frappe.ui.form.on("Annoucements Detail", {
 



frappe.ui.form.on("Annoucements Detail", {
    // intentionally left blank
});
//     // // -------------------------------
//     // // ✅ AUTO FILL FACULTY TABLE
//     // // -------------------------------
//     // faculty_announcement(frm) {
 
//     //     if (frm.doc.faculty_announcement === "All Faculty") {
 
//     //         frm.clear_table("faculty_name");
 
//     //         frappe.call({
//     //             method: "frappe.client.get_list",
//     //             args: {
//     //                 doctype: "Faculty",
//     //                 fields: ["name"]
//     //             },
//     //             callback(r) {
//     //                 if (r.message) {
//     //                     r.message.forEach(f => {
//     //                         let row = frm.add_child("faculty_name");
//     //                         row.faculty = f.name;
//     //                     });
//     //                     frm.refresh_field("faculty_name");
//     //                     frappe.msgprint("✅ All Faculty Added!");
//     //                 }
//     //             }
//     //         });
 
//     //     } else {
//     //         frm.clear_table("faculty_name");
//     //         frm.refresh_field("faculty_name");
//     //     }
//     // },
 
//     // // -------------------------------
//     // // ✅ AUTO FILL SUPERVISOR TABLE
//     // // -------------------------------
//     // supervisor_announcement(frm) {
 
//     //     if (frm.doc.supervisor_announcement === "All Supervisor") {
 
//     //         frm.clear_table("supervisor_name");
 
//     //         frappe.call({
//     //             method: "frappe.client.get_list",
//     //             args: {
//     //                 doctype: "Supervisor",
//     //                 fields: ["name"]
//     //             },
//     //             callback(r) {
//     //                 if (r.message) {
//     //                     r.message.forEach(s => {
//     //                         let row = frm.add_child("supervisor_name");
//     //                         row.supervisor = s.name;
//     //                     });
//     //                     frm.refresh_field("supervisor_name");
//     //                     frappe.msgprint("✅ All Supervisors Added!");
//     //                 }
//     //             }
//     //         });
 
//     //     } else {
//     //         frm.clear_table("supervisor_name");
//     //         frm.refresh_field("supervisor_name");
//     //     }
//     // },
 
//     // // -------------------------------
//     // // ✅ AUTO GENERATE ANNOUNCEMENT ID
//     // // Format: AD-2024-1
//     // // -------------------------------
//     // before_save(frm) {
 
//     //     // Do not regenerate if already set
//     //     if (frm.doc.announcement_id) {
//     //         return;
//     //     }
 
//     //     if (!frm.doc.academic_year) {
//     //         frappe.msgprint("Please select Academic Year before saving.");
//     //         frappe.validated = false;
//     //         return;
//     //     }
 
//     //     // Extract start year (2024 from 2024-2025)
//     //     let year = frm.doc.academic_year.split("-")[0];
 
//     //     frappe.call({
//     //         method: "frappe.client.get_list",
//     //         args: {
//     //             doctype: "Annoucements Detail",
//     //             fields: ["announcement_id"],
//     //             filters: {
//     //                 academic_year: frm.doc.academic_year
//     //             },
//     //             order_by: "creation desc",
//     //             limit: 1
//     //         },
//     //         callback: function (r) {
 
//     //             let next_no = 1;
 
//     //             if (r.message && r.message.length > 0) {
//     //                 let last_id = r.message[0].announcement_id;
//     //                 if (last_id) {
//     //                     // AD-2024-3 → take last number
//     //                     let parts = last_id.split("-");
//     //                     let last_no = parseInt(parts[2]) || 0;
//     //                     next_no = last_no + 1;
//     //                 }
//     //             }
 
//     //             let new_id = `AD-${year}-${next_no}`;
//     //             frm.set_value("announcement_id", new_id);
//     //         }
//     //     });
//     // },
 
//     // // -------------------------------
//     // // ✅ SET ADDED TIME
//     // // -------------------------------
//     // refresh(frm) {
//     //     if (!frm.doc.added_time) {
//     //         frm.set_value("added_time", frappe.datetime.now_datetime());
// //         }
// //     }
// // });
 
 
// // =====================================================================
// //  ENGAGEMENT – AUTO SET FROM URL
// // =====================================================================
// frappe.ui.form.on("Engagement", {
//     onload: function (frm) {
 
//         const params = new URLSearchParams(window.location.search);
 
//         let ann = params.get("announcement");
//         let year = params.get("academic_year");
 
//         if (ann && !frm.doc.announcement) {
//             frm.set_value("announcement", ann);
//         }
 
//         if (year && !frm.doc.academic_year) {
//             frm.set_value("academic_year", year);
//         }
//     }
// });
 
 