frappe.ui.form.on('Announcement', {

    faculty_announcement(frm) {
        if (frm.doc.faculty_announcement === "All Faculty") {

            // Clear existing table
            frm.clear_table("faculty_name");

            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Faculty Master",
                    fields: ["name"]
                },
                callback(r) {
                    if (r.message) {
                        r.message.forEach(fac => {
                            let row = frm.add_child("faculty_name");
                            row.faculty = fac.name;
                        });
                    }
                    frm.refresh_field("faculty_name");
                }
            });

        } else {
            frm.clear_table("faculty_name");
            frm.refresh_field("faculty_name");
        }
    },


    supervisor_announcement(frm) {
        if (frm.doc.supervisor_announcement === "All Supervisor") {

            // Clear existing rows
            frm.clear_table("supervisor_name");

            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Supervisor Master",
                    fields: ["name"]
                },
                callback(r) {
                    if (r.message) {
                        r.message.forEach(sup => {
                            let row = frm.add_child("supervisor_name");
                            row.supervisor = sup.name;
                        });
                    }
                    frm.refresh_field("supervisor_name");
                }
            });

        } else {
            frm.clear_table("supervisor_name");
            frm.refresh_field("supervisor_name");
        }
    }

});
