// Initialize the namespace first
    frappe.pages = frappe.pages || {};
    frappe.pages['engagement-tracker-r'] = frappe.pages['engagement-tracker-r'] || {};

    frappe.pages['engagement-tracker-r'].on_page_load = function(wrapper) {
        const page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'Engagement Tracker - All Sections',
            single_column: true
        });

        // ===================================================================
        // 1. ADVANCED PROFESSIONAL ANIMATIONS & STYLES
        // ===================================================================
        const animationStyles = `
            <style>
                /* Premium fade-in with blur */
                @keyframes fadeInBlur {
                    from { opacity: 0; filter: blur(10px); transform: translateY(40px); }
                    to { opacity: 1; filter: blur(0); transform: translateY(0); }
                }
                
                /* Sophisticated gradient animation */
                @keyframes gradientFlow {
                    0% { background-position: 0% 50%; }
                    25% { background-position: 100% 50%; }
                    50% { background-position: 100% 100%; }
                    75% { background-position: 0% 100%; }
                    100% { background-position: 0% 50%; }
                }
                
                /* Floating animation for icons */
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                /* Glow pulse effect */
                @keyframes glowPulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(74, 144, 226, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(74, 144, 226, 0.6); }
                }
                
                /* Card entrance from bottom */
                @keyframes slideUpBounce {
                    0% { opacity: 0; transform: translateY(60px) scale(0.95); }
                    60% { opacity: 1; transform: translateY(-10px) scale(1.02); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                /* Shine effect sweep */
                @keyframes shine {
                    0% { left: -100%; }
                    20%, 100% { left: 100%; }
                }
                
                /* Rotate and scale */
                @keyframes rotateScale {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.1); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                /* Text shimmer */
                @keyframes textShimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                
                /* Count up animation */
                @keyframes countUp {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                /* Ribbon fold effect */
                @keyframes ribbonFold {
                    0% { transform: rotateY(-90deg); opacity: 0; }
                    100% { transform: rotateY(0deg); opacity: 1; }
                }

                /* Main content */
                .animated-content {
                    animation: fadeInBlur 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                /* Premium gradient header */
                .animated-header {
                    background: linear-gradient(135deg, 
                        #003366 0%, 
                        #1e5a8e 25%, 
                        #4a90e2 50%, 
                        #2c5282 75%, 
                        #003366 100%);
                    background-size: 400% 400%;
                    animation: gradientFlow 15s ease infinite;
                    position: relative;
                    overflow: hidden;
                }
                
                /* Header shine overlay */
                .animated-header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.1) 50%,
                        transparent 70%
                    );
                    animation: shine 3s infinite;
                }
                
                /* Enhanced title shimmer */
                .shimmer-text {
                    background: linear-gradient(
                        90deg,
                        rgba(255,255,255,0.8) 0%,
                        rgba(255,255,255,1) 50%,
                        rgba(255,255,255,0.8) 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: textShimmer 3s linear infinite;
                }
                
                /* Section buttons premium effects */
                .section-btn {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                    transform-style: preserve-3d;
                }
                
                /* Shine overlay on buttons */
                .section-btn::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -100%;
                    width: 100%;
                    height: 200%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255,255,255,0.4),
                        transparent
                    );
                    transform: skewX(-20deg);
                    transition: left 0.7s;
                }
                
                .section-btn:hover::before {
                    left: 200%;
                }
                
                .section-btn:hover {
                    transform: translateY(-8px) scale(1.03);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.25), 
                                0 5px 15px rgba(0,0,0,0.15);
                }
                
                .section-btn:active {
                    transform: translateY(-4px) scale(1.01);
                    transition: all 0.1s;
                }
                
                /* Floating icons */
                .icon-float {
                    display: inline-block;
                    animation: float 3s ease-in-out infinite;
                }
                
                /* Premium card animations */
                .module-card, .refl-card, .obj-card, .card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation: slideUpBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
                    position: relative;
                    overflow: hidden;
                }
                
                /* Card glow on hover */
                .module-card:hover, .refl-card:hover, .obj-card:hover {
                    transform: translateY(-12px) scale(1.05) rotateX(5deg);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    animation: glowPulse 2s ease-in-out infinite;
                }
                
                /* Card shine effect */
                .module-card::after, .refl-card::after, .obj-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255,255,255,0.3),
                        transparent
                    );
                    transition: left 0.5s;
                }
                
                .module-card:hover::after, 
                .refl-card:hover::after, 
                .obj-card:hover::after {
                    left: 100%;
                }
                
                /* Staggered animations with more delays */
                .col-md-4:nth-child(1) .module-card,
                .col-md-4:nth-child(1) .refl-card,
                .col-md-4:nth-child(1) .obj-card { animation-delay: 0.05s; }
                
                .col-md-4:nth-child(2) .module-card,
                .col-md-4:nth-child(2) .refl-card,
                .col-md-4:nth-child(2) .obj-card { animation-delay: 0.1s; }
                
                .col-md-4:nth-child(3) .module-card,
                .col-md-4:nth-child(3) .refl-card,
                .col-md-4:nth-child(3) .obj-card { animation-delay: 0.15s; }
                
                .col-md-4:nth-child(4) .module-card,
                .col-md-4:nth-child(4) .refl-card,
                .col-md-4:nth-child(4) .obj-card { animation-delay: 0.2s; }
                
                .col-md-4:nth-child(5) .module-card,
                .col-md-4:nth-child(5) .refl-card,
                .col-md-4:nth-child(5) .obj-card { animation-delay: 0.25s; }
                
                .col-md-4:nth-child(6) .module-card,
                .col-md-4:nth-child(6) .refl-card,
                .col-md-4:nth-child(6) .obj-card { animation-delay: 0.3s; }
                
                .col-md-4:nth-child(n+7) .module-card,
                .col-md-4:nth-child(n+7) .refl-card,
                .col-md-4:nth-child(n+7) .obj-card { animation-delay: 0.35s; }
                
                /* Loading spinner enhancement */
                @keyframes spinGlow {
                    0% { transform: rotate(0deg); filter: hue-rotate(0deg); }
                    100% { transform: rotate(360deg); filter: hue-rotate(360deg); }
                }
                
                .spinner-border {
                    animation: spinGlow 1.5s linear infinite;
                    box-shadow: 0 0 20px rgba(0, 51, 102, 0.5);
                }
                
                /* Filter row slide and fade */
                .filter-slide-in {
                    animation: slideUpBounce 0.6s ease-out, ribbonFold 0.8s ease-out;
                }
                
                /* Table entrance */
                .table-fade-in {
                    animation: fadeInBlur 0.6s ease-out;
                }
                
                /* Button 3D press effect */
                .btn {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform-style: preserve-3d;
                }
                
                .btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.6);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                .btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                }
                
                .btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .btn:active::before {
                    width: 400px;
                    height: 400px;
                    opacity: 0;
                }
                
                /* Checkbox transformation */
                .emp-check {
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    cursor: pointer;
                }
                
                .emp-check:hover {
                    transform: scale(1.15);
                }
                
                .emp-check:checked {
                    transform: scale(1.3) rotate(360deg);
                }
                
                /* Input focus glow */
                .form-control {
                    transition: all 0.4s ease;
                }
                
                .form-control:focus {
                    transform: scale(1.03);
                    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.25),
                                0 8px 16px rgba(74, 144, 226, 0.15);
                    border-color: #4a90e2;
                }
                
                /* Alert slide entrance */
                @keyframes alertSlide {
                    0% { opacity: 0; transform: translateY(-100px) scale(0.9); }
                    50% { transform: translateY(10px) scale(1.05); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                .alert {
                    animation: alertSlide 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                /* Table row premium hover */
                .table tbody tr {
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .table tbody tr:hover {
                    background: linear-gradient(90deg, 
                        rgba(74, 144, 226, 0.05) 0%, 
                        rgba(74, 144, 226, 0.15) 50%, 
                        rgba(74, 144, 226, 0.05) 100%);
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                
                /* Badge pulse animation */
                .badge-animated {
                    animation: countUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                               glowPulse 2s ease-in-out infinite;
                }
                
                /* Color transitions */
                .text-purple { 
                    color: #805ad5; 
                    transition: all 0.3s;
                }
                
                .text-purple:hover {
                    color: #9b6fd8;
                    text-shadow: 0 0 10px rgba(128, 90, 213, 0.5);
                }
                
                .text-blue { 
                    color: #5a67d8; 
                    transition: all 0.3s;
                }
                
                .text-blue:hover {
                    color: #6c7de0;
                    text-shadow: 0 0 10px rgba(90, 103, 216, 0.5);
                }
                
                /* Smooth scroll */
                html {
                    scroll-behavior: smooth;
                }
                
                /* Section navigation enhancement */
                #section_nav {
                    animation: fadeInBlur 0.8s ease-out;
                }
                
                /* Count badge effect */
                .count-badge {
                    animation: countUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: inline-block;
                }
                
                /* Loading text pulse */
                #loading p {
                    animation: glowPulse 1.5s ease-in-out infinite;
                }
                
                /* Card body content fade */
                .card-body {
                    transition: all 0.3s ease;
                }
                
                .card:hover .card-body {
                    transform: translateY(-5px);
                }
                
                /* Header subtitle animation */
                @keyframes subtitleSlide {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 0.9; transform: translateX(0); }
                }
                
                .animated-header p {
                    animation: subtitleSlide 0.8s ease-out 0.3s backwards;
                }
                
                /* Export button group */
                .btn-group .btn {
                    transition: all 0.3s ease;
                }
                
                .btn-group .btn:hover {
                    z-index: 10;
                    transform: translateY(-5px) scale(1.1);
                }
                
                /* Back button special effect */
                #back_btn {
                    transition: all 0.3s ease;
                }
                
                #back_btn:hover {
                    transform: translateX(-8px);
                }
                
                /* Multi-select action buttons */
                #multi_actions {
                    animation: slideUpBounce 0.5s ease-out;
                }
                
                /* Professional border animation */
                @keyframes borderGlow {
                    0%, 100% { border-color: currentColor; }
                    50% { border-color: rgba(74, 144, 226, 0.8); }
                }
                
                .module-card:hover,
                .refl-card:hover,
                .obj-card:hover {
                    animation: borderGlow 2s ease-in-out infinite;
                }
                
                /* No Data State Animation */
                @keyframes emptyStateBounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                
                @keyframes emptyIconSpin {
                    0% { transform: rotate(0deg); opacity: 0.3; }
                    50% { transform: rotate(180deg); opacity: 0.7; }
                    100% { transform: rotate(360deg); opacity: 0.3; }
                }
                
                .empty-state {
                    animation: fadeInBlur 0.8s ease-out;
                }
                
                .empty-state-icon {
                    animation: emptyStateBounce 2s ease-in-out infinite;
                }
                
                .empty-state-spinner {
                    animation: emptyIconSpin 3s linear infinite;
                }
            </style>
        `;
        
        $('head').append(animationStyles);

        // ===================================================================
        // 2. LOAD LIBRARIES ONCE
        // ===================================================================
        if (!window.libs_loaded) {
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => {
                $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js');
            });
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js');
            window.libs_loaded = true;
        }

        // ===================================================================
        // 3. PROFESSIONAL COLOR SCHEME
        // ===================================================================
        const COLORS = {
            primary: '#003366',
            secondary: '#4a5568',
            accent: '#2c5282',
            lightAccent: '#4a90e2',
            success: '#2d6a4f',
            warning: '#b7791f',
            lightBg: '#f8f9fa',
            mediumBg: '#e9ecef',
            border: '#dee2e6',
            textDark: '#212529',
            textLight: '#6c757d',
            white: '#ffffff'
        };

        // ===================================================================
        // 4. SECTIONS & MODULES
        // ===================================================================
        const allSections = {
            'research_writing': { title: 'Research & Writing', color: COLORS.primary, icon: '📚' },
            'teaching_mentoring': { title: 'Teaching & Mentoring', color: COLORS.accent, icon: '👨‍🏫' },
            'practice_public_engagement': { title: 'Practice & Public Engagement', color: COLORS.success, icon: '🌍' },
            'institution_building': { title: 'Institution Building', color: COLORS.warning, icon: '🏛️' },
            'objectives': { title: 'Objectives', color: '#5a67d8', icon: '🎯' },
            'reflection': { title: 'Reflection', color: '#805ad5', icon: '💭' }
        };

        const REFLECTION_MODULES = [
            { label: 'Teaching-Mentoring-Reflection', field: 'test1' },
            { label: 'Research-Writing-Reflection', field: 'test' },
            { label: 'Practice-Public Engagement-Reflection', field: 'test2' },
            { label: 'Institution Building-Reflection', field: 'test3' },
            { label: 'Other Reflection', field: 'test4' },
            { label: 'All Reflections (Combined)', field: '__ALL__' }
        ];

        const MODULES = {
            research_writing: [
                { label: 'Article in Peer Reviewed Journal', field: 'article_in_peer_reviewed_journal' },
                { label: 'Article in Non-Reviewed Journal', field: 'article_in_nonreviewed_journal_or_conference_proceedings' },
                { label: 'Discussion Paper or Working Paper', field: 'discussion_paper_or_working_paper' },
                { label: 'Book', field: 'book' },
                { label: 'Chapters in Edited Book', field: 'chapters_in_edited_book_or_in_long_report' },
                { label: 'Full-Length Reports', field: 'fulllengths_reports' },
                { label: 'Policy Briefs', field: 'policy_briefs' },
                { label: 'Full-Length Case Study', field: 'fulllength_case_study' },
                { label: 'Editor of Books', field: 'editor_of_books_or_other_publications' },
                { label: 'Material Development', field: 'material_development_for_teacher_education_curriculum' },
                { label: 'Journal Editorial Board', field: 'journal_editorial_board_member' },
                { label: 'Talks and Presentations', field: 'talks_and_presentations' },
                { label: 'Articles in Newspapers', field: 'articles_in_newspapers_magazines_and_other_publications' },
                { label: 'Podcast/Webinar/TV', field: 'podcast_webinar_radio_tv_video_episode_exhibition_etc' },
                { label: 'Translation', field: 'translation' },
                { label: 'Peer Review', field: 'peer_review_of_journal_articles' },
                { label: 'Conference Organising', field: 'conference_workshop_organising' },
                { label: 'Other Publications', field: 'other_publications_or_research_related_work' },
                { label: 'Ongoing Research', field: 'ongoing_research_projects' }
            ],
            teaching_mentoring: [
                { label: 'Course Details', field: 'course_details' },
                { label: 'Mentoring Details', field: 'mentoring' },
                { label: 'Designing Programs/Courses', field: 'designing_teaching_programs_or_courses' },
                { label: 'Workshops for Students', field: 'workshops_for_university_students' }
            ],
            practice_public_engagement: [
                { label: 'Practice Public Engagement', field: 'practice_public' },
                { label: 'Professional Development', field: 'professional_development_programs' },
                { label: 'Public Talks & Webinars', field: 'public_talks_webinars_guest_lectures_etc' },
                { label: 'Social Sector Initiatives', field: 'contribution_to_social_sector_initiatives' },
                { label: 'Government Initiatives', field: 'contribution_to_government_related_initiatives' },
                { label: 'PhD/Masters Supervision', field: 'phd_mastersug_thesis_supervision_or_review' },
                { label: 'Other Academic Institutions', field: 'contribution_at_other_academic_institutions' },
                { label: 'Consulting', field: 'consulting' },
                { label: 'Other Contributions', field: 'other' }
            ],
            institution_building: [
                { label: 'Institution Details', field: 'institution_details' },
                { label: 'Roles and Committees', field: 'roles_and_committees' },
                { label: 'Conference Volunteering', field: 'contributing_to_organising_conferences_ev' }
            ],
            objectives: [
                { label: 'Objectives', field: 'data_onnv', is_objective: true }
            ],
            reflection: REFLECTION_MODULES
        };

        const EXCLUDE_FIELDS = ['name','owner','creation','modified','modified_by','docstatus','idx','parent','parentfield','parenttype','doctype'];

        // ===================================================================
        // 5. GLOBAL STATE
        // ===================================================================
        let allData = [];
        let filteredData = [];
        let currentSection = null;
        let selectedEmployees = [];

        let $filterRow, $grid, $tableView, $searchInput;

        // ===================================================================
        // 6. MAIN UI WITH PREMIUM ANIMATIONS
        // ===================================================================
        const $content = $(`
            <div class="animated-content" style="padding:20px; font-family:'Segoe UI',sans-serif; background:${COLORS.lightBg}; min-height:100vh;">
                <div class="animated-header" style="text-align:center; margin-bottom:30px; padding:35px; border-radius:12px; color:white; box-shadow:0 8px 24px rgba(0,0,0,0.15);">
                    <h2 class="shimmer-text" style="font-weight:700; margin:0; font-size:36px; letter-spacing:1px;">🎓 Engagement Tracker</h2>
                    <p style="margin:15px 0 0; font-size:17px; font-weight:300; letter-spacing:0.5px;">Academic & Professional Activities Dashboard</p>
                </div>

                <div id="section_nav" style="margin-bottom:30px; padding:25px; background:white; border-radius:12px; border:1px solid ${COLORS.border}; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                    <h4 style="text-align:center; margin-bottom:25px; color:${COLORS.textDark}; font-weight:600; font-size:20px;">Select Academic Section</h4>
                    <div class="row" id="section_buttons"></div>
                </div>

                <div id="filter_row" class="filter-slide-in" style="display:none; margin-bottom:25px; padding:22px; background:white; border-radius:12px; border:1px solid ${COLORS.border}; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                    <div class="row align-items-end">
                        <div class="col-md-3"><label style="font-weight:600; margin-bottom:8px;">Academic Year</label><select id="filter_year" class="form-control"><option value="">All Years</option></select></div>
                        <div class="col-md-3"><label style="font-weight:600; margin-bottom:8px;">School</label><select id="filter_school" class="form-control"><option value="">All Schools</option></select></div>
                        <div class="col-md-2"><label style="font-weight:600; margin-bottom:8px;">Campus</label><select id="filter_campus" class="form-control"><option value="">All Campuses</option></select></div>
                        <div class="col-md-3"><label id="filter_label" style="font-weight:600; margin-bottom:8px;">Module</label><select id="type_filter" class="form-control"><option value="">-- Select --</option></select></div>
                        <div class="col-md-1"><button id="clear_filter" class="btn btn-secondary w-100">🔄 Clear</button></div>
                    </div>
                </div>

                <div id="search_row" style="display:none; margin-bottom:25px; max-width:600px;">
                    <input type="text" id="global_search" class="form-control" placeholder="🔍 Search by employee name..." style="padding:12px 20px; font-size:15px;">
                </div>

                <div id="loading" style="text-align:center; padding:120px;">
                    <div class="spinner-border text-primary" style="width:5rem; height:5rem; border-width:4px;"></div>
                    <p style="margin-top:25px; font-size:20px; font-weight:600; color:${COLORS.primary};">Loading Engagement Data...</p>
                    <p style="color:${COLORS.textLight}; font-size:14px;">Please wait while we fetch your data</p>
                </div>

                <div id="module_grid" style="display:none;"></div>
                <div id="table_view" class="table-fade-in" style="display:none;"></div>
            </div>
        `).appendTo(page.body);

        $filterRow = $('#filter_row');
        $grid = $('#module_grid');
        $tableView = $('#table_view');
        $searchInput = $('#global_search');

        // ===================================================================
        // 7. LOAD DATA
        // ===================================================================
        function loadData() {
            $('#loading').show();
            frappe.call({
                method: 'fpms.api.engagement_tracker.get_engagement_tracker_list',
                callback: function(r) {
                    $('#loading').hide();
                    if (r.message && r.message.length) {
                        allData = r.message;
                        filteredData = [...allData];
                        buildSectionButtons();
                        populateGlobalFilters();
                        frappe.show_alert({message: '✅ Data loaded successfully! (' + allData.length + ' records)', indicator: 'green'}, 4);
                    } else {
                        frappe.msgprint('No data found');
                    }
                },
                error: () => { $('#loading').hide(); frappe.msgprint('Failed to load data'); }
            });
        }

        // ===================================================================
        // 8. GLOBAL FILTERS
        // ===================================================================
        function populateGlobalFilters() {
            const years = [...new Set(allData.map(d => d.academic_year).filter(Boolean))].sort();
            const schools = [...new Set(allData.map(d => d.school_details).filter(Boolean))].sort();
            const campuses = [...new Set(allData.map(d => d.campus).filter(Boolean))].sort();

            $('#filter_year').empty().append('<option value="">All Years</option>');
            $('#filter_school').empty().append('<option value="">All Schools</option>');
            $('#filter_campus').empty().append('<option value="">All Campuses</option>');

            years.forEach(y => $('#filter_year').append(`<option>${y}</option>`));
            schools.forEach(s => $('#filter_school').append(`<option>${s}</option>`));
            campuses.forEach(c => $('#filter_campus').append(`<option>${c}</option>`));

            $('#filter_year, #filter_school, #filter_campus').on('change', applyFilters);
            $('#clear_filter').on('click', () => {
                $('#filter_year,#filter_school,#filter_campus,#type_filter').val('');
                $searchInput.val('');
                filteredData = [...allData];
                refreshCurrentView();
                frappe.show_alert({message: '🔄 Filters cleared', indicator: 'blue'}, 2);
            });
        }

        function applyFilters() {
            const y = $('#filter_year').val();
            const s = $('#filter_school').val();
            const c = $('#filter_campus').val();
            filteredData = allData.filter(d =>
                (!y || d.academic_year === y) &&
                (!s || d.school_details === s) &&
                (!c || d.campus === c)
            );
            refreshCurrentView();
            frappe.show_alert({message: `📊 Showing ${filteredData.length} records`, indicator: 'blue'}, 2);
        }

        function refreshCurrentView() {
            $grid.empty().hide();
            $tableView.hide();
            $('#search_row').hide();
            $searchInput.val('');
            $('#type_filter').off('change').empty().append('<option value="">-- Select --</option>');

            if (!currentSection) return;

            if (currentSection === 'reflection') buildReflectionCards();
            else if (currentSection === 'objectives') buildObjectivesCards();
            else if (currentSection === 'employee_summary') showEmployeeSummary();
            else buildModuleGrid();
        }

        // ===================================================================
        // 9. SECTION BUTTONS WITH PREMIUM ANIMATION
        // ===================================================================
        function buildSectionButtons() {
            let html = '';
            Object.keys(allSections).forEach(key => {
                const s = allSections[key];
                html += `<div class="col-md-4 mb-3">
                    <button class="btn section-btn w-100" data-section="${key}"
                        style="padding:25px; border:3px solid ${s.color}; color:${s.color}; background:white; font-weight:600; font-size:16px; border-radius:12px;">
                        <div class="icon-float" style="font-size:42px; margin-bottom:12px;">${s.icon}</div>
                        <div style="font-weight:700;">${s.title}</div>
                    </button>
                </div>`;
            });
            html += `<div class="col-md-4 mb-3">
                <button class="btn section-btn w-100" data-section="employee_summary"
                    style="padding:25px; border:3px solid #1565c0; color:#1565c0; background:white; font-weight:600; border-radius:12px;">
                    <div class="icon-float" style="font-size:42px; margin-bottom:12px;">👥</div>
                    <div style="font-weight:700;">Employee Summary</div>
                </button>
            </div>`;
            $('#section_buttons').html(html);

            $('.section-btn').on('click', function() {
                currentSection = $(this).data('section');
                const borderColor = $(this).css('border-color');
                $('.section-btn').css({background:'white', color: borderColor});
                $(this).css({background: borderColor, color:'white'});
                $filterRow.show().addClass('filter-slide-in');
                $('#filter_label').text(currentSection === 'reflection' ? '💭 Reflection Type' : currentSection === 'objectives' ? '🎯 Faculty' : '📋 Module');
                refreshCurrentView();
            });
        }

        // ===================================================================
        // 10. MODULE GRID (Normal Sections)
        // ===================================================================
        function buildModuleGrid() {
            const section = allSections[currentSection];
            const modules = MODULES[currentSection] || [];

            let html = `<div style="background:white; padding:30px; border-radius:12px; border:1px solid ${COLORS.border}; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                <h4 style="color:${section.color}; border-bottom:4px solid ${section.color}; padding-bottom:15px; margin-bottom:25px; font-size:24px; display:flex; align-items:center;">
                    <span style="font-size:36px; margin-right:15px;">${section.icon}</span> ${section.title}
                </h4>
                <div class="row">`;

            modules.forEach(m => {
                const count = filteredData.reduce((sum, d) => sum + (Array.isArray(d[m.field]) ? d[m.field].length : 0), 0);
                if (count > 0) {
                    html += `<div class="col-md-4 mb-4">
                        <div class="card module-card h-100" data-field="${m.field}" data-label="${m.label}" style="cursor:pointer; border-left:6px solid ${section.color}; border-radius:10px; transition:all 0.3s;">
                            <div class="card-body" style="padding:20px;">
                                <h6 class="card-title mb-3" style="font-weight:600; font-size:15px; color:#2c3e50;">${m.label}</h6>
                                <div style="display:flex; align-items:center; justify-content:space-between;">
                                    <p class="text-muted mb-0" style="font-size:13px;">Total Records</p>
                                    <span class="count-badge" style="background:${section.color}; color:white; padding:6px 14px; border-radius:20px; font-weight:700; font-size:16px;">${count}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }
            });
            html += `</div></div>`;
            $grid.html(html).fadeIn();

            const $sel = $('#type_filter');
            modules.forEach(m => {
                const cnt = filteredData.reduce((s,d) => s + (Array.isArray(d[m.field])?d[m.field].length:0), 0);
                if (cnt>0) $sel.append(`<option value="${m.field}">${m.label} (${cnt})</option>`);
            });
            $sel.on('change', function() {
                const f = $(this).val();
                if (f) showTable(f, modules.find(x => x.field === f).label);
            });

            $(document).off('click', '.module-card').on('click', '.module-card', function() {
                const field = $(this).data('field');
                const label = $(this).data('label');
                showTable(field, label);
            });
        }

        function showTable(field, label) {
            let records = [];
            filteredData.forEach(doc => {
                if (Array.isArray(doc[field])) {
                    doc[field].forEach(r => {
                        records.push({ employee_name: doc.employee_name || 'N/A', academic_year: doc.academic_year, school_details: doc.school_details, campus: doc.campus || 'N/A', ...r });
                    });
                }
            });

            if (!records.length) {
                $tableView.html(`<div style="padding:100px; text-align:center; color:#999; font-size:18px;">
                    <div style="font-size:60px; margin-bottom:20px;">📭</div>
                    <strong>No records found for ${label}</strong>
                </div>`).show();
                return;
            }

            const back = `<button id="back_btn" class="btn btn-secondary" style="padding:10px 20px;">⬅️ Back to Grid</button>`;
            const exports = `<div class="btn-group">
                <button id="pdf_btn" class="btn btn-danger" style="padding:10px 20px;">📄 Export PDF</button>
                <button id="excel_btn" class="btn btn-success" style="padding:10px 20px;">📊 Export Excel</button>
                <button id="csv_btn" class="btn btn-info" style="padding:10px 20px;">📋 Export CSV</button>
            </div>`;

            $tableView.html(`
                <div style="background:white; padding:30px; border-radius:12px; border:1px solid ${COLORS.border}; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                    <div style="margin-bottom:25px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">
                        ${back} ${exports}
                    </div>
                    <h5 style="color:${allSections[currentSection].color}; margin-bottom:20px; font-size:22px; font-weight:700;">
                        ${allSections[currentSection].icon} ${label} 
                        <span class="badge-animated" style="background:${allSections[currentSection].color}; color:white; padding:8px 16px; border-radius:20px; font-size:14px; margin-left:10px;">${records.length} records</span>
                    </h5>
                    ${renderGeneralTable(records)}
                </div>
            `).fadeIn();

            $('#back_btn').on('click', () => { $tableView.hide(); $grid.show(); $('#type_filter').val(''); });
            $('#pdf_btn').on('click', () => downloadAsPDF(label, records));
            $('#excel_btn').on('click', () => downloadAsExcel(label, records));
            $('#csv_btn').on('click', () => downloadAsCSV(label, records));
        }

        // ===================================================================
        // 11. REFLECTIONS
        // ===================================================================
        function buildReflectionCards() {
            selectedEmployees = [];
            const empMap = {};
            filteredData.forEach(d => {
                const name = d.employee_name || 'Unknown';
                if (!empMap[name]) empMap[name] = { count: 0, campus: d.campus || 'N/A' };
                REFLECTION_MODULES.forEach(m => { if (m.field !== '__ALL__' && d[m.field]?.trim()) empMap[name].count++; });
            });

            let html = `<div style="background:white; padding:30px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; flex-wrap:wrap;">
                    <h4 style="color:#805ad5; margin:0; font-size:24px; font-weight:700;">💭 Reflections by Employee</h4>
                    <div id="multi_actions" style="display:none;">
                        <span id="sel_count" class="badge-animated" style="margin-right:12px; font-weight:700; background:#805ad5; color:white; padding:10px 18px; border-radius:25px; font-size:14px;"></span>
                        <button id="view_sel" class="btn btn-sm" style="background:#805ad5; color:white; padding:8px 16px; font-weight:600;">👁️ View Selected</button>
                        <button id="clear_sel" class="btn btn-sm btn-secondary" style="padding:8px 16px;">✖️ Clear</button>
                    </div>
                </div>
                <div class="row">`;

            Object.keys(empMap).sort().forEach(name => {
                if (empMap[name].count > 0) {
                    html += `<div class="col-md-4 mb-4">
                        <div class="card refl-card" data-emp="${name}" style="cursor:pointer; border-left:6px solid #805ad5; border-radius:10px;">
                            <div class="card-body" style="padding:20px; position:relative;">
                                <input type="checkbox" class="emp-check" data-emp="${name}" style="position:absolute; top:15px; right:15px; width:20px; height:20px;">
                                <h6 style="font-weight:600; font-size:15px; color:#2c3e50; padding-right:30px;">${name}</h6>
                                <small class="text-purple" style="font-size:13px; font-weight:600;">${empMap[name].count} reflection${empMap[name].count>1?'s':''}</small>
                                <div style="margin-top:8px; font-size:12px; color:#7f8c8d;">📍 ${empMap[name].campus}</div>
                            </div>
                        </div>
                    </div>`;
                }
            });
            html += `</div></div>`;
            $grid.html(html).show();

            setupReflectionEvents();
            populateReflectionDropdown();
        }

        function setupReflectionEvents() {
            $(document).off('change', '.emp-check').on('change', '.emp-check', function(e) {
                e.stopPropagation();
                const emp = $(this).data('emp');
                if (this.checked) {
                    if (!selectedEmployees.includes(emp)) selectedEmployees.push(emp);
                } else {
                    selectedEmployees = selectedEmployees.filter(e => e !== emp);
                }
                $('#sel_count').text(selectedEmployees.length + ' selected');
                $('#multi_actions').toggle(selectedEmployees.length > 0);
            });

            $(document).off('click', '#view_sel').on('click', '#view_sel', () => showMultipleReflections(selectedEmployees));
            $(document).off('click', '#clear_sel').on('click', '#clear_sel', () => { 
                selectedEmployees = []; 
                $('.emp-check').prop('checked', false); 
                $('#multi_actions').hide(); 
                buildReflectionCards(); 
            });

            $(document).off('click', '.refl-card').on('click', '.refl-card', function(e) {
                if (!$(e.target).hasClass('emp-check')) {
                    const emp = $(this).data('emp');
                    showEmployeeReflections(emp);
                }
            });
        }

        function populateReflectionDropdown() {
            const $sel = $('#type_filter').empty().append('<option value="">All Types</option>');
            REFLECTION_MODULES.forEach(m => {
                if (m.field === '__ALL__') {
                    const cnt = filteredData.filter(d => REFLECTION_MODULES.some(mm => mm.field !== '__ALL__' && d[mm.field]?.trim())).length;
                    if (cnt>0) $sel.append(`<option value="__ALL__">${m.label} (${cnt})</option>`);
                } else {
                    const cnt = filteredData.filter(d => d[m.field]?.trim()).length;
                    if (cnt>0) $sel.append(`<option value="${m.field}">${m.label} (${cnt})</option>`);
                }
            });
            $sel.on('change', function() {
                const val = $(this).val();
                if (val === '__ALL__') showAllReflections();
                else if (val) showReflectionType(val, REFLECTION_MODULES.find(x => x.field === val).label);
            });
        }

        function showReflectionType(field, label) {
            const records = filteredData.flatMap(d => {
                if (d[field]?.trim()) {
                    return [{ employee_name: d.employee_name, academic_year: d.academic_year, school_details: d.school_details, campus: d.campus || 'N/A', type: label, content: d[field].trim() }];
                }
                return [];
            });
            renderReflectionTable(label, records);
        }

        function showEmployeeReflections(emp) {
            const records = filteredData.flatMap(d => {
                if (d.employee_name !== emp) return [];
                return REFLECTION_MODULES.filter(m => m.field !== '__ALL__').map(m => {
                    if (d[m.field]?.trim()) return { employee_name: emp, academic_year: d.academic_year, school_details: d.school_details, campus: d.campus || 'N/A', type: m.label, content: d[m.field].trim() };
                }).filter(Boolean);
            });
            renderReflectionTable(`Reflections - ${emp}`, records);
        }

        function showMultipleReflections(emps) {
            const records = filteredData.flatMap(d => {
                if (!emps.includes(d.employee_name)) return [];
                return REFLECTION_MODULES.filter(m => m.field !== '__ALL__').map(m => {
                    if (d[m.field]?.trim()) return { employee_name: d.employee_name, academic_year: d.academic_year, school_details: d.school_details, campus: d.campus || 'N/A', type: m.label, content: d[m.field].trim() };
                }).filter(Boolean);
            });
            renderReflectionTable(`Reflections - ${emps.length} Employees`, records);
        }

        function showAllReflections() {
            const records = filteredData.flatMap(d => {
                return REFLECTION_MODULES.filter(m => m.field !== '__ALL__').map(m => {
                    if (d[m.field]?.trim()) return { employee_name: d.employee_name, academic_year: d.academic_year, school_details: d.school_details, campus: d.campus || 'N/A', type: m.label, content: d[m.field].trim() };
                }).filter(Boolean);
            });
            renderReflectionTable('All Reflections', records);
        }

        function renderReflectionTable(title, records) {
            if (!records.length) {
                $tableView.html(`<div style="padding:100px; text-align:center;">
                    <div style="font-size:60px; margin-bottom:20px;">📭</div>
                    <strong style="font-size:18px; color:#999;">No reflections found</strong>
                </div>`).show();
                return;
            }
            const back = `<button id="back_btn" class="btn btn-secondary" style="padding:10px 20px;">⬅️ Back to Grid</button>`;
            const exp = `<div class="btn-group">
                <button id="pdf_btn" class="btn btn-danger" style="padding:10px 20px;">📄 PDF</button>
                <button id="excel_btn" class="btn btn-success" style="padding:10px 20px;">📊 Excel</button>
                <button id="csv_btn" class="btn btn-info" style="padding:10px 20px;">📋 CSV</button>
            </div>`;
            $tableView.html(`
                <div style="background:white; padding:30px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                    <div style="margin-bottom:25px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:15px;">${back} ${exp}</div>
                    <h5 style="color:#805ad5; font-size:22px; font-weight:700;">
                        💭 ${title} 
                        <span class="badge-animated" style="background:#805ad5; color:white; padding:8px 16px; border-radius:20px; font-size:14px; margin-left:10px;">${records.length} records</span>
                    </h5>
                    <div style="overflow-x:auto; margin-top:20px;"><table class="table table-bordered table-hover" style="font-size:14px;">
                        <thead style="background:#805ad5; color:white;"><tr>
                            <th style="padding:12px;">#</th>
                            <th style="padding:12px;">Employee</th>
                            <th style="padding:12px;">Year</th>
                            <th style="padding:12px;">School</th>
                            <th style="padding:12px;">Campus</th>
                            <th style="padding:12px;">Type</th>
                            <th style="padding:12px;">Content</th>
                        </tr></thead>
                        <tbody>${records.map((r,i) => `<tr><td style="padding:12px;">${i+1}</td><td style="padding:12px;">${r.employee_name}</td><td style="padding:12px;">${r.academic_year}</td><td style="padding:12px;">${r.school_details}</td><td style="padding:12px;">${r.campus}</td><td style="padding:12px;">${r.type}</td><td style="max-width:600px; word-wrap:break-word; padding:12px;">${r.content.replace(/\n/g,'<br>')}</td></tr>`).join('')}</tbody>
                    </table></div>
                </div>
            `).show();
            $grid.hide();
            $('#back_btn').on('click', () => { $tableView.hide(); buildReflectionCards(); });
            $('#pdf_btn').on('click', () => downloadAsPDF(title, records, true));
            $('#excel_btn').on('click', () => downloadAsExcel(title, records, true));
            $('#csv_btn').on('click', () => downloadAsCSV(title, records, true));
        }

        // ===================================================================
        // 12. OBJECTIVES
        // ===================================================================
        function buildObjectivesCards() {
            const facMap = {};
            filteredData.forEach(d => {
                if (Array.isArray(d.data_onnv) && d.data_onnv.length) {
                    const name = d.employee_name;
                    if (!facMap[name]) facMap[name] = { count: 0, campus: d.campus || 'N/A' };
                    facMap[name].count += d.data_onnv.length;
                }
            });

            let html = `<div style="background:white; padding:30px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                <h4 style="color:#5a67d8; margin-bottom:25px; font-size:24px; font-weight:700;">🎯 Objectives by Faculty</h4>
                <div class="row">`;

            Object.keys(facMap).sort().forEach(name => {
                html += `<div class="col-md-4 mb-4">
                    <div class="card obj-card" data-fac="${name}" style="cursor:pointer; border-left:6px solid #5a67d8; border-radius:10px;">
                        <div class="card-body" style="padding:20px;">
                            <h6 style="font-weight:600; font-size:15px; color:#2c3e50;">${name}</h6>
                            <small class="text-blue" style="font-size:13px; font-weight:600;">${facMap[name].count} objective${facMap[name].count>1?'s':''}</small>
                            <div style="margin-top:8px; font-size:12px; color:#7f8c8d;">📍 ${facMap[name].campus}</div>
                        </div>
                    </div>
                </div>`;
            });
            html += `</div></div>`;
            $grid.html(html).show();

            $('#type_filter').empty().append('<option value="">-- Select Faculty --</option>');
            Object.keys(facMap).sort().forEach(n => {
                $('#type_filter').append(`<option value="${n}">${n} (${facMap[n].count})</option>`);
            });
            $('#type_filter').on('change', function() {
                const f = $(this).val();
                if (f) showObjectives(f);
            });

            $(document).off('click', '.obj-card').on('click', '.obj-card', function() {
                showObjectives($(this).data('fac'));
            });
        }

        function showObjectives(faculty) {
            const records = filteredData.filter(d => d.employee_name === faculty && Array.isArray(d.data_onnv)).flatMap(d => 
                d.data_onnv.map(r => ({
                    employee_name: faculty,
                    academic_year: d.academic_year,
                    school_details: d.school_details,
                    campus: d.campus || 'N/A',
                    category: r.objective_category || '-',
                    details: r.objective_details || '-'
                }))
            );

            const back = `<button id="back_btn" class="btn btn-secondary" style="padding:10px 20px;">⬅️ Back to Grid</button>`;
            const exp = `<div class="btn-group">
                <button id="pdf_btn" class="btn btn-danger" style="padding:10px 20px;">📄 PDF</button>
                <button id="excel_btn" class="btn btn-success" style="padding:10px 20px;">📊 Excel</button>
            </div>`;
            $tableView.html(`
                <div style="background:white; padding:30px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                    <div style="margin-bottom:25px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:15px;">${back} ${exp}</div>
                    <h5 style="color:#5a67d8; font-size:22px; font-weight:700;">
                        🎯 Objectives - ${faculty} 
                        <span class="badge-animated" style="background:#5a67d8; color:white; padding:8px 16px; border-radius:20px; font-size:14px; margin-left:10px;">${records.length}</span>
                    </h5>
                    <div style="overflow-x:auto; margin-top:20px;"><table class="table table-bordered table-hover" style="font-size:14px;">
                        <thead style="background:#5a67d8; color:white;"><tr>
                            <th style="padding:12px;">#</th>
                            <th style="padding:12px;">Category</th>
                            <th style="padding:12px;">Details</th>
                        </tr></thead>
                        <tbody>${records.map((r,i) => `<tr><td style="padding:12px;">${i+1}</td><td style="padding:12px;">${r.category}</td><td style="padding:12px;">${r.details}</td></tr>`).join('')}</tbody>
                    </table></div>
                </div>
            `).show();
            $grid.hide();
            $('#back_btn').on('click', () => { $tableView.hide(); buildObjectivesCards(); });
            $('#pdf_btn').on('click', () => downloadAsPDF(`Objectives_${faculty}`, records, false, true));
            $('#excel_btn').on('click', () => downloadAsExcel(`Objectives_${faculty}`, records, false, true));
        }

        // ===================================================================
        // 13. EMPLOYEE SUMMARY
        // ===================================================================
        function showEmployeeSummary() {
            const stats = {};
            filteredData.forEach(d => {
                const name = d.employee_name || 'Unknown';
                if (!stats[name]) stats[name] = { total: 0, year: d.academic_year, school: d.school_details, campus: d.campus || 'N/A' };
                Object.keys(MODULES).forEach(sec => {
                    if (sec === 'objectives' || sec === 'reflection') return;
                    MODULES[sec].forEach(m => {
                        if (Array.isArray(d[m.field])) stats[name].total += d[m.field].length;
                    });
                });
            });

            let html = `<div style="background:white; padding:30px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                <h4 style="color:#1565c0; margin-bottom:25px; font-size:24px; font-weight:700;">👥 Employee Activity Summary</h4>
                <div class="row">`;
            Object.keys(stats).sort().forEach(name => {
                if (stats[name].total > 0) {
                    html += `<div class="col-md-4 mb-4">
                        <div class="card" style="border-left:6px solid #1565c0; border-radius:10px;">
                            <div class="card-body" style="padding:20px;">
                                <h6 style="font-weight:700; font-size:16px; color:#2c3e50; margin-bottom:15px;">${name}</h6>
                                <div style="font-size:13px; color:#7f8c8d; line-height:1.8;">
                                    <div><strong>📅 Year:</strong> ${stats[name].year}</div>
                                    <div><strong>🏫 School:</strong> ${stats[name].school}</div>
                                    <div><strong>📍 Campus:</strong> ${stats[name].campus}</div>
                                    <div style="margin-top:12px; padding-top:12px; border-top:2px solid #1565c0;">
                                        <strong style="color:#1565c0; font-size:16px;">📊 Total Activities: ${stats[name].total}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }
            });
            html += `</div></div>`;
            $grid.html(html).show();
        }

        // ===================================================================
        // 14. EXPORT FUNCTIONS
        // ===================================================================
        function getDynamicKeys(records) {
            const keys = new Set();
            records.forEach(r => Object.keys(r).forEach(k => { if (!EXCLUDE_FIELDS.includes(k) && !['employee_name','academic_year','school_details','campus'].includes(k)) keys.add(k); }));
            return Array.from(keys).sort();
        }

        function renderGeneralTable(records) {
            const keys = getDynamicKeys(records);
            let html = `<div style="overflow-x:auto; margin-top:20px;"><table class="table table-bordered table-hover" style="font-size:13px;">
                <thead style="background:${allSections[currentSection]?.color || COLORS.primary}; color:white;">
                    <tr>
                        <th style="padding:12px;">#</th>
                        <th style="padding:12px;">Employee</th>
                        <th style="padding:12px;">Year</th>
                        <th style="padding:12px;">School</th>
                        <th style="padding:12px;">Campus</th>
                        ${keys.map(k => `<th style="padding:12px;">${k.replace(/_/g,' ').replace(/\b\w/g, l => l.toUpperCase())}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>`;
            records.forEach((r,i) => {
                html += `<tr>
                    <td style="padding:12px;">${i+1}</td>
                    <td style="padding:12px;">${r.employee_name}</td>
                    <td style="padding:12px;">${r.academic_year}</td>
                    <td style="padding:12px;">${r.school_details}</td>
                    <td style="padding:12px;">${r.campus}</td>`;
                keys.forEach(k => html += `<td style="padding:12px;">${(r[k] || '').toString().substring(0,100)}</td>`);
                html += `</tr>`;
            });
            return html + `</tbody></table></div>`;
        }

        function downloadAsPDF(title, records, isReflection = false, isObjective = false) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('l', 'mm', 'a4');
            
            // Enhanced PDF header with gradient effect
            doc.setFillColor(0,51,102); 
            doc.rect(0,0,297,25,'F');
            doc.setFillColor(30,90,142); 
            doc.rect(0,25,297,5,'F');
            
            doc.setTextColor(255,255,255); 
            doc.setFontSize(18); 
            doc.setFont(undefined, 'bold');
            doc.text('🎓 Engagement Tracker', 148.5, 13, {align:'center'});
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            doc.text(title, 148.5, 21, {align:'center'});
            
            doc.setTextColor(100,100,100);
            doc.setFontSize(9);
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 148.5, 36, {align:'center'});

            let head = [], body = [];
            if (isReflection) {
                head = [['#','Employee','Year','School','Campus','Type','Content']];
                body = records.map((r,i) => [i+1, r.employee_name, r.academic_year, r.school_details, r.campus, r.type, r.content.substring(0,100)]);
            } else if (isObjective) {
                head = [['#','Employee','Year','School','Campus','Category','Details']];
                body = records.map((r,i) => [i+1, r.employee_name, r.academic_year, r.school_details, r.campus, r.category, r.details.substring(0,100)]);
            } else {
                const keys = getDynamicKeys(records);
                head = [['#','Employee','Year','School','Campus'].concat(keys.map(k => k.replace(/_/g,' ')))];
                body = records.map((r,i) => [i+1, r.employee_name, r.academic_year, r.school_details, r.campus].concat(keys.map(k => (r[k]||'').toString())));
            }
            
            doc.autoTable({
                head, 
                body, 
                startY: 42, 
                theme: 'striped',
                headStyles: { fillColor: [0, 51, 102], fontSize: 10, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 245, 245] },
                styles: { fontSize: 9, cellPadding: 3 }
            });
            
            doc.save(title.replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
            frappe.show_alert({message: '📄 PDF downloaded successfully!', indicator: 'green'}, 3);
        }

        function downloadAsExcel(title, records, isReflection = false, isObjective = false) {
            let data = [];
            if (isReflection) {
                data = records.map((r,i) => ({
                    '#':i+1, 
                    Employee:r.employee_name, 
                    Year:r.academic_year, 
                    School:r.school_details, 
                    Campus:r.campus, 
                    Type:r.type, 
                    Content:r.content
                }));
            } else if (isObjective) {
                data = records.map((r,i) => ({
                    '#':i+1, 
                    Employee:r.employee_name, 
                    Year:r.academic_year,
                    School:r.school_details,
                    Campus:r.campus,
                    Category:r.category, 
                    Details:r.details
                }));
            } else {
                const keys = getDynamicKeys(records);
                data = records.map((r,i) => {
                    const row = {'#':i+1, Employee:r.employee_name, Year:r.academic_year, School:r.school_details, Campus:r.campus};
                    keys.forEach(k => row[k.replace(/_/g,' ')] = r[k]);
                    return row;
                });
            }
            const ws = XLSX.utils.json_to_sheet(data);
            
            // Style the header row
            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const address = XLSX.utils.encode_col(C) + "1";
                if (!ws[address]) continue;
                ws[address].s = {
                    font: { bold: true, color: { rgb: "FFFFFF" } },
                    fill: { fgColor: { rgb: "003366" } }
                };
            }
            
            const wb = XLSX.utils.book_new(); 
            XLSX.utils.book_append_sheet(wb, ws, "Data");
            XLSX.writeFile(wb, title.replace(/[^a-zA-Z0-9]/g,'_') + '.xlsx');
            frappe.show_alert({message: '📊 Excel downloaded successfully!', indicator: 'green'}, 3);
        }

        function downloadAsCSV(title, records, isReflection = false) {
            let csv = '';
            if (isReflection) {
                csv = '#,Employee,Year,School,Campus,Type,Content\n' + records.map((r,i) => 
                    `${i+1},"${r.employee_name}","${r.academic_year}","${r.school_details}","${r.campus}","${r.type}","${r.content.replace(/"/g,'""')}"`
                ).join('\n');
            } else {
                const keys = getDynamicKeys(records);
                csv = '#,Employee,Year,School,Campus,' + keys.join(',') + '\n';
                csv += records.map((r,i) => 
                    [i+1, r.employee_name, r.academic_year, r.school_details, r.campus]
                    .concat(keys.map(k => `"${(r[k]||'').toString().replace(/"/g,'""')}"`))
                    .join(',')
                ).join('\n');
            }
            const blob = new Blob(['\uFEFF' + csv], {type: 'text/csv;charset=utf-8;'});
            saveAs(blob, title.replace(/[^a-zA-Z0-9]/g,'_') + '.csv');
            frappe.show_alert({message: '📋 CSV downloaded successfully!', indicator: 'green'}, 3);
        }

        // ===================================================================
        // 15. START APPLICATION
        // ===================================================================
        loadData();
    };