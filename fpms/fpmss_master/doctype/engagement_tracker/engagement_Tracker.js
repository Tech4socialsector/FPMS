frappe.ui.form.on("Engagement Tracker", {

    refresh(frm) {

        // Hide print before submit
        if (frm.doc.engagement_tracker_status !== "Submit") {
            $('.page-actions .btn[data-original-title="Print"]').hide();
        }

        // If submitted → lock form
        if (frm.doc.engagement_tracker_status === "Submit") {

            frm.disable_form();
            $('.page-actions .btn[data-original-title="Print"]').show();

            // Let supervisor re-enable editing
            if ($('.custom-edit-btn').length === 0 && frappe.user.has_role("Supervisor")) {

                let btn = $('<button class="btn btn-danger btn-sm custom-edit-btn ml-2">Enable to Edit</button>');

                btn.on("click", function () {
                    frm.enable_form();
                    frm.set_value("engagement_tracker_status", "Save");
                    frm.save();
                });

                $(".page-actions").append(btn);
            }

            return;
        }

        // --------------------
        // Custom Submit Button
        // --------------------
        setTimeout(() => {

            const saveBtn = $('button[data-label="Save"]');
            saveBtn.text("Save as Draft");

            if (!$('.custom-submit-btn').length) {

                let submitBtn = $('<button class="btn btn-primary btn-sm custom-submit-btn ml-2">Submit</button>');

                submitBtn.on("click", function () {

                    // ❌ EMAIL EMPTY → BLOCK SUBMISSION
                    if (!frm.doc.email) {
                        frappe.throw("Email is required before submitting the form.");
                    }

                    frm.set_value("engagement_tracker_status", "Submit");

                    frm.save().then(() => {

                        // 🔥 This triggers backend on_submit()
                        frm.submit();

                        frappe.msgprint("🎉 Successfully Submitted! Email will be sent shortly.");
                    });
                });

                saveBtn.after(submitBtn);
            }

        }, 200);

        // First time default
        if (!frm.doc.engagement_tracker_status) {
            frm.set_value("engagement_tracker_status", "Save");
        }
    }
});
