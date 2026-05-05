//----------------------------------------------------------
// LIST VIEW SETTINGS → Rename "Add Engagement Tracker" → "Add Item"
//----------------------------------------------------------
frappe.listview_settings['Engagement Tracker'] = {
    onload: function(listview) {
        setTimeout(() => {
            $('button:contains("Add Engagement Tracker")').text("Add Item");
        }, 500);
    }
};


//----------------------------------------------------------
// FORM SCRIPT → Save as Draft → Submit → Lock → Supervisor Enable Edit
//----------------------------------------------------------
frappe.ui.form.on('Engagement Tracker', {
    refresh(frm) {

        //--------------------------------------------------
        // Always hide the Print button initially
        //--------------------------------------------------
        setTimeout(() => {
            $('.page-actions .btn[data-original-title="Print"]').hide();
            $('.page-actions .btn[aria-label="Print"]').hide();
        }, 300);


        //--------------------------------------------------
        // Fields to make read-only after Submit
        //--------------------------------------------------
        const readonly_fields = [
            "data_onnv",
            "employee_id",
            "mentoring",
            "employee_name",
            "first_id",
            "email",
            "supervisor",
            "supervisor_mail",
            "announcement",
            "academic_year",
            "school_details",
            "campus",
            "status",
            "course_details",
            "designing_teaching_programs_or_courses",
            "workshops_for_university_students",
            "article_in_peer_reviewed_journal",
            "article_in_nonreviewed_journal_or_conference_proceedings",
            "discussion_paper_or_working_paper",
            "book",
            "chapters_in_edited_book_or_in_long_report",
            "fulllengths_reports",
            "policy_briefs",
            "fulllength_case_study",
            "editor_of_books_or_other_publications",
            "material_development_for_teacher_education_curriculum",
            "journal_editorial_board_member",
            "talks_and_presentations",
            "articles_in_newspapers_magazines_and_other_publications",
            "podcast_webinar_radio_tv_video_episode_exhibition_etc",
            "translation",
            "review_of_books_film_etc",
            "peer_review_of_journal_articles",
            "conference_workshop_organising",
            "other_publications_or_research_related_work",
            "ongoing_research_projects",
            "practice_public",
            "professional_development_programs",
            "public_talks_webinars_guest_lectures_etc",
            "contribution_to_social_sector_initiatives",
            "contribution_to_government_related_initiatives",
            "phd_mastersug_thesis_supervision_or_review",
            "contribution_at_other_academic_institutions",
            "consulting",
            "other",
            "institution_details",
            "roles_and_committees",
            "contributing_to_organising_conferences_ev",
            "test1",
            "test",
            "test2",
            "test3"
        ];



        //--------------------------------------------------
        // CASE 1 → When status = SUBMIT
        //--------------------------------------------------
        if (frm.doc.engagement_tracker_status === "Submit") {

            // Make fields readonly
            readonly_fields.forEach(f => frm.set_df_property(f, "read_only", 1));

            // Hide Save button
            $('button[data-label="Save"]').hide();

            // Show Print
            $('.page-actions .btn[data-original-title="Print"]').show();


            // Disable Submit button (if exists)
            const sb = $('.custom-submit-btn');
            if (sb.length) {
                sb.prop("disabled", true)
                  .addClass("btn-secondary")
                  .removeClass("btn-primary")
                  .text("Submitted");
            }


            //--------------------------------------------------
            // Supervisor → Enable to Edit Button
            //--------------------------------------------------
            if (frappe.user.has_role("Supervisor")) {
                setTimeout(() => {
                    if (!$('.custom-edit-btn').length) {

                        $('<button class="btn btn-danger btn-sm custom-edit-btn ml-2">')
                            .text("Enable to Edit")
                            .on('click', function () {

                                frm.set_read_only(false);

                                frm.set_value("engagement_tracker_status", "Save");

                                frm.save_or_update().then(() => {
                                    frappe.msgprint("Editing Enabled");
                                    frm.refresh();
                                });
                            })
                            .appendTo('.page-actions');
                    }
                }, 300);
            }
        }


        //--------------------------------------------------
        // CASE 2 → When status = SAVE (Draft Mode)
        //--------------------------------------------------
        else if (frm.doc.engagement_tracker_status === "Save") {

            // Ensure all fields editable
            readonly_fields.forEach(f => frm.set_df_property(f, "read_only", 0));

            setTimeout(() => {

                const saveBtn = $('button[data-label="Save"]');
                if (!saveBtn.length) return;

                //--------------------------------------------
                // Change Save → Save as Draft
                //--------------------------------------------
                saveBtn.text("Save as Draft");

                saveBtn.off("click").on("click", function () {
                    frm.set_value("engagement_tracker_status", "Save");
                    frm.save_or_update();
                });


                //--------------------------------------------
                // Add Submit button (only once)
                //--------------------------------------------
                if (!$('.custom-submit-btn').length) {

                    const sb = $('<button class="btn btn-primary btn-sm custom-submit-btn ml-2">')
                        .text("Submit")
                        .on('click', function () {

                            frm.set_value("engagement_tracker_status", "Submit");

                            frm.save_or_update().then(() => {
                                saveBtn.hide();
                                frm.refresh();
                            });

                        });

                    saveBtn.after(sb);
                }

            }, 300);
        }
    }
});

frappe.ui.form.on('Engagement Tracker', {
    before_load: function(frm) {
        if (frm.is_new()) {
            const params = frappe.utils.get_query_params();
            
            if (params.academic_year) {
                frm.doc.academic_year = params.academic_year;
            }
            
            if (params.announcement) {
                frm.doc.announcement = params.announcement;
            }
        }
    }
});