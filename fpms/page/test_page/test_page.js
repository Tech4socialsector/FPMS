// Initialize the namespace first
frappe.pages = frappe.pages || {};
frappe.pages['test-page'] = frappe.pages['test-page'] || {};

frappe.pages['test-page'].on_page_load = function (wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Engagement Tracker - All Sections',
        single_column: true
    });

    // ===================================================================
    // 1. LOAD LIBRARIES ONCE
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
    // 2. PROFESSIONAL UNIVERSITY COLOR SCHEME
    // ===================================================================
    const COLORS = {
        primary: '#003366',        // Deep Navy Blue
        secondary: '#4a5568',      // Slate Gray
        accent: '#2c5282',         // Professional Blue
        lightAccent: '#4a90e2',    // Light Blue
        success: '#2d6a4f',        // Forest Green
        warning: '#b7791f',        // Muted Gold
        lightBg: '#f8f9fa',        // Light Gray
        mediumBg: '#e9ecef',       // Medium Gray
        border: '#dee2e6',         // Border Gray
        textDark: '#212529',       // Dark Text
        textLight: '#6c757d',      // Light Text
        white: '#ffffff',
        headerBg: '#003366'        // Navy Blue
    };

    // ===================================================================
    // 3. ALL SECTIONS + REFLECTIONS
    // ===================================================================
    const allSections = {
        'research_writing': { title: 'Research & Writing', color: COLORS.primary, icon: '📚' },
        'teaching_mentoring': { title: 'Teaching & Mentoring', color: COLORS.accent, icon: '👨‍🏫' },
        'practice_public_engagement': { title: 'Practice & Public Engagement', color: COLORS.success, icon: '🌐' },
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

    Object.keys(allSections).forEach(key => {
        allSections[key].modules = getModulesForSection(key);
    });

    function getModulesForSection(section) {
        const modules = {
            'research_writing': [
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
            'teaching_mentoring': [
                { label: 'Course Details', field: 'course_details' },
                { label: 'Mentoring Details', field: 'mentoring' },
                { label: 'Designing Programs/Courses', field: 'designing_teaching_programs_or_courses' },
                { label: 'Workshops for Students', field: 'workshops_for_university_students' }
            ],
            'practice_public_engagement': [
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
            'institution_building': [
                { label: 'Institution Details', field: 'institution_details' },
                { label: 'Roles and Committees', field: 'roles_and_committees' },
                { label: 'Conference Volunteering', field: 'contributing_to_organising_conferences_ev' }
            ],
            'objectives': [
                { label: 'Objectives', field: 'data_onnv', is_objective: true }
            ]
        };
        return section === 'reflection' ? REFLECTION_MODULES : (modules[section] || []);
    }

    const EXCLUDE_FIELDS = ['name', 'owner', 'creation', 'modified', 'modified_by', 'docstatus', 'idx', 'parent', 'parentfield', 'parenttype', 'doctype'];

    // ===================================================================
    // 4. GLOBAL STATE
    // ===================================================================
    let allData = null;
    let filteredData = null;
    let currentSection = null;
    let currentCardData = [];
    let $sectionNav, $filterRow, $grid, $tableView, $searchInput;

    // ===================================================================
    // 5. MAIN UI
    // ===================================================================
    let $content = $(`
        <div style="padding:20px; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; background:${COLORS.lightBg}; min-height:100vh;">
            <!-- HEADER -->
            <div style="text-align:center; margin-bottom:30px; padding:25px; background:${COLORS.primary}; border-radius:8px; color:white; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="font-weight:600; margin-bottom:8px; font-size:28px;">Engagement Tracker</h2>
                <p style="opacity:0.9; font-size:15px; margin:0;">Academic & Professional Activities Dashboard</p>
            </div>

            <!-- SECTION NAVIGATION -->
            <div id="section_nav" style="margin-bottom:25px; padding:20px; background:${COLORS.white}; border-radius:8px; border:1px solid ${COLORS.border}; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                <h4 style="text-align:center; margin-bottom:20px; font-weight:600; color:${COLORS.textDark}; font-size:18px;">Select Academic Section</h4>
                <div class="row" id="section_buttons"></div>
            </div>

            <!-- ====================== FILTER ROW (Year + School + Campus + Module) ====================== -->
            <div id="filter_row" style="display:none; margin-bottom:20px; padding:18px; background:${COLORS.white}; border-radius:8px; border:1px solid ${COLORS.border}; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                <div class="row align-items-end">
                    <div class="col-md-3">
                        <label style="font-weight:600; color:${COLORS.textDark}; font-size:14px; margin-bottom:5px;">Academic Year</label>
                        <select id="filter_year" class="form-control" style="border-radius:6px; border:1px solid ${COLORS.border};"></select>
                    </div>

                    <div class="col-md-2">
                        <label style="font-weight:600; color:${COLORS.textDark}; font-size:14px; margin-bottom:5px;">School</label>
                        <select id="filter_school" class="form-control" style="border-radius:6px; border:1px solid ${COLORS.border};"></select>
                    </div>

                    <!-- CAMPUS FILTER -->
                    <div class="col-md-2">
                        <label style="font-weight:600; color:${COLORS.textDark}; font-size:14px; margin-bottom:5px;">Campus</label>
                        <select id="filter_campus" class="form-control" style="border-radius:6px; border:1px solid ${COLORS.border};"></select>
                    </div>

                    <!-- MODULE/TYPE FILTER -->
                    <div class="col-md-3">
                        <label id="filter_label" style="font-weight:600; color:${COLORS.textDark}; font-size:14px; margin-bottom:5px;">Module</label>
                        <select id="type_filter" class="form-control" style="border-radius:6px; border:1px solid ${COLORS.border};"></select>
                    </div>

                    <div class="col-md-2">
                        <button id="clear_filter" class="btn w-100" style="background:${COLORS.secondary}; color:white; border:none; border-radius:6px; padding:10px; font-weight:600;">Clear Filters</button>
                    </div>
                </div>
            </div>

            <!-- GLOBAL SEARCH (CARD LEVEL ONLY) -->
            <div id="search_row" style="display:none; margin-bottom:20px; max-width:500px;">
                <input type="text" id="global_search" class="form-control" placeholder="Search by employee name..." style="border-radius:6px; padding:10px 14px; border:1px solid ${COLORS.border};">
            </div>

            <!-- Loading -->
            <div id="loading" style="text-align:center; padding:80px;">
                <div class="spinner-border" style="width:3.5rem; height:3.5rem; color:${COLORS.accent};"></div>
                <p style="margin-top:20px; font-weight:600; font-size:16px; color:${COLORS.textDark};">Loading Engagement Data...</p>
            </div>

            <!-- Module Grid -->
            <div id="module_grid" style="display:none;"></div>

            <!-- Table View -->
            <div id="table_view" style="display:none;"></div>
        </div>
    `);
    $content.appendTo(page.body);

    $filterRow = $('#filter_row');
    $grid = $('#module_grid');
    $tableView = $('#table_view');
    $searchInput = $('#global_search');

    // ===================================================================
    // 6. AUTO LOAD DATA
    // ===================================================================
    function autoLoadData() {
        $('#loading').show();
        frappe.call({
            method: 'fpms.api.engagement_tracker_api.get_engagement_tracker_list',
            callback: function (r) {
                $('#loading').hide();
                if (r.message && r.message.length) {
                    allData = r.message;
                    filteredData = [...allData];
                    buildSectionButtons();
                    populateGlobalFilters();
                    frappe.show_alert({ message: 'Data loaded successfully!', indicator: 'green' }, 3);
                } else {
                    frappe.show_alert({ message: 'No data found', indicator: 'orange' }, 3);
                }
            },
            error: function () {
                $('#loading').hide();
                frappe.msgprint('Failed to load data');
            }
        });
    }

    // ===================================================================
    // 7. GLOBAL FILTERS (Year + School + Campus)
    // ===================================================================
    function populateGlobalFilters() {
        const years    = [...new Set(allData.map(d => d.academic_year).filter(Boolean))].sort();
        const schools  = [...new Set(allData.map(d => d.school_details).filter(Boolean))].sort();
        const campuses = [...new Set(allData.map(d => d.campus).filter(Boolean))].sort();

        const $year    = $('#filter_year').empty().append('<option value="">All Years</option>');
        const $school  = $('#filter_school').empty().append('<option value="">All Schools</option>');
        const $campus  = $('#filter_campus').empty().append('<option value="">All Campuses</option>');

        years.forEach(y => $year.append(`<option value="${y}">${y}</option>`));
        schools.forEach(s => $school.append(`<option value="${s}">${s}</option>`));
        campuses.forEach(c => $campus.append(`<option value="${c}">${c}</option>`));

        $('#filter_year, #filter_school, #filter_campus').on('change', applyGlobalFilters);
        $('#clear_filter').on('click', clearAllFilters);
    }

    function applyGlobalFilters() {
        const year   = $('#filter_year').val();
        const school = $('#filter_school').val();
        const campus = $('#filter_campus').val();

        filteredData = allData.filter(d =>
            (!year   || d.academic_year   === year) &&
            (!school || d.school_details === school) &&
            (!campus || d.campus         === campus)
        );
        refreshCurrentView();
    }

    function clearAllFilters() {
        $('#filter_year, #filter_school, #filter_campus, #type_filter').val('');
        $searchInput.val('');
        filteredData = [...allData];
        refreshCurrentView();
    }

    function refreshCurrentView() {
        if (!currentSection) return;
        $grid.empty().hide();
        $tableView.hide();
        $('#search_row').hide();
        $searchInput.val('');

        if (currentSection === 'reflection') {
            buildReflectionCards();
        } else if (currentSection === 'objectives') {
            buildObjectivesCards();
        } else if (currentSection === 'employee_summary') {
            showEmployeeSummary();
        } else {
            populateDropdown();
            buildModuleGrid();
        }
    }

    // ===================================================================
    // 8. BUILD SECTION BUTTONS (3 COLUMNS)
    // ===================================================================
    function buildSectionButtons() {
        let html = '';
        Object.keys(allSections).forEach(key => {
            const s = allSections[key];
            html += `
                <div class="col-md-4 mb-3">
                    <button class="btn section-btn w-100" data-section="${key}"
                        style="background:white; color:${s.color}; padding:18px; border-radius:8px; border:2px solid ${s.color}; 
                            font-weight:600; font-size:14px; transition:all 0.2s; box-shadow:0 2px 4px rgba(0,0,0,0.08);">
                        <div style="font-size:24px; margin-bottom:6px;">${s.icon}</div>
                        ${s.title}
                    </button>
                </div>
            `;
        });
        html += `
            <div class="col-md-4 mb-3">
                <button class="btn section-btn w-100" data-section="employee_summary"
                    style="background:white; color:#1565c0; padding:18px; border-radius:8px; border:2px solid #1565c0; 
                        font-weight:600; font-size:14px; transition:all 0.2s; box-shadow:0 2px 4px rgba(0,0,0,0.08);">
                    <div style="font-size:24px; margin-bottom:6px;">👥</div>
                    Employee Summary
                </button>
            </div>
        `;
        $('#section_buttons').html(html);

        $('.section-btn').on('click', function () {
            currentSection = $(this).data('section');
            $('.section-btn').css({ background: 'white', color: $(this).css('border-color') });
            $(this).css({ background: $(this).css('border-color'), color: 'white' });
            $filterRow.show();

            // Update filter label based on section
            $('#filter_label').text(
                currentSection === 'objectives' ? 'Faculty' :
                currentSection === 'reflection' ? 'Reflection Type' :
                'Module'
            );

            refreshCurrentView();
        });
    }

    // ===================================================================
    // 9. CARD-LEVEL SEARCH (REFLECTION & OBJECTIVES)
    // ===================================================================
    function setupCardSearch(cardData, renderCallback) {
        currentCardData = cardData;
        $('#search_row').show();
        $searchInput.off('input').on('input', function () {
            const term = $(this).val().trim().toLowerCase();
            const filtered = term ? cardData.filter(c => c.employee.toLowerCase().includes(term)) : cardData;
            renderCallback(filtered);
        });
    }

    // ===================================================================
    // 10. REFLECTIONS – PER EMPLOYEE CARD (3 COLUMNS) WITH MULTI-SELECT
    // ===================================================================
    let selectedEmployees = [];

    function buildReflectionCards() {
        selectedEmployees = [];
        $('#filter_label').text('Reflection Type');
        const $select = $('#type_filter').empty().append('<option value="">All Reflections</option>');

        REFLECTION_MODULES.forEach(m => {
            const isAll = m.field === '__ALL__';
            const count = isAll
                ? filteredData.filter(d => REFLECTION_MODULES.some(mm => mm.field !== '__ALL__' && d[mm.field]?.trim())).length
                : filteredData.filter(d => d[m.field]?.trim()).length;
            if (count) $select.append(`<option value="${m.field}">${m.label} (${count})</option>`);
        });

        $select.on('change', () => {
            const field = $select.val();
            if (field === '__ALL__') showAllReflections();
            else if (field) showReflectionTable(field, REFLECTION_MODULES.find(m => m.field === field).label);
            else $tableView.fadeOut(300, () => $grid.fadeIn(400));
        });

        const employeeMap = {};
        filteredData.forEach(doc => {
            const emp = doc.employee_name || 'Unknown';
            if (!employeeMap[emp]) employeeMap[emp] = { count: 0, campus: doc.campus || 'N/A' };
            REFLECTION_MODULES.forEach(m => {
                if (m.field === '__ALL__') return;
                if (doc[m.field]?.trim()) employeeMap[emp].count++;
            });
        });

        const cardData = Object.keys(employeeMap)
            .map(emp => ({ employee: emp, count: employeeMap[emp].count, campus: employeeMap[emp].campus }))
            .filter(c => c.count > 0)
            .sort((a, b) => a.employee.localeCompare(b.employee));

        function renderCards(data) {
            let html = `<div style="background:${COLORS.white}; padding:25px; border-radius:8px; border:1px solid ${COLORS.border};">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap;">
                    <h4 style="color:#805ad5; border-bottom:2px solid #e9d8fd; padding-bottom:12px; font-size:18px; font-weight:600; margin:0; flex:1; min-width:250px;">Reflections (Per Employee)</h4>
                    <div id="multi_select_actions" style="display:${selectedEmployees.length > 0 ? 'flex' : 'none'}; align-items:center; gap:10px;">
                        <span id="selected_count" style="font-weight:600; color:${COLORS.textDark}; white-space:nowrap;">${selectedEmployees.length} selected</span>
                        <button id="view_selected_btn" class="btn btn-sm" style="background:#805ad5; color:white; padding:8px 18px; border-radius:6px; border:none; font-weight:600; cursor:pointer;">View Selected</button>
                        <button id="clear_selection_btn" class="btn btn-sm" style="background:${COLORS.secondary}; color:white; padding:8px 18px; border-radius:6px; border:none; font-weight:600; cursor:pointer;">Clear All</button>
                    </div>
                </div>
                <div class="row">`;
            
            data.forEach((item, i) => {
                const isSelected = selectedEmployees.includes(item.employee);
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="p-3 rounded module-box" data-employee="${item.employee}"
                            style="background:${isSelected ? '#f3e8ff' : COLORS.white}; border:1px solid ${isSelected ? '#805ad5' : COLORS.border}; border-left:3px solid #805ad5; cursor:pointer; transition:all 0.2s; position:relative;">
                            <input type="checkbox" class="employee-checkbox" data-employee="${item.employee}" 
                                style="position:absolute; top:10px; right:10px; width:20px; height:20px; cursor:pointer; z-index:10;" 
                                ${isSelected ? 'checked' : ''}>
                            <h6 style="color:${COLORS.textDark}; font-size:14px; font-weight:600; margin-bottom:4px; padding-right:35px;">${item.employee}</h6>
                            <small style="color:#805ad5; font-weight:500;">${item.count} reflection${item.count > 1 ? 's' : ''}</small>
                        </div>
                    </div>`;
            });
            html += `</div></div>`;
            $grid.html(html).fadeIn(500);

            $('.employee-checkbox').off('click').on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const emp = $(this).data('employee');
                const card = $(this).closest('.module-box');
                const isChecked = !$(this).prop('checked');
                
                $(this).prop('checked', isChecked);
                
                if (isChecked) {
                    if (!selectedEmployees.includes(emp)) {
                        selectedEmployees.push(emp);
                    }
                    card.css('background', '#f3e8ff').css('border-color', '#805ad5');
                } else {
                    selectedEmployees = selectedEmployees.filter(e => e !== emp);
                    card.css('background', COLORS.white).css('border-color', COLORS.border);
                }

                if (selectedEmployees.length > 0) {
                    $('#multi_select_actions').show();
                    $('#selected_count').text(`${selectedEmployees.length} selected`);
                } else {
                    $('#multi_select_actions').hide();
                }
            });

            $('.module-box').on('mouseenter', function() {
                $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.12)').css('transform', 'translateY(-2px)');
            }).on('mouseleave', function() {
                $(this).css('box-shadow', 'none').css('transform', 'translateY(0)');
            }).on('click', function(e) {
                const $checkbox = $(this).find('.employee-checkbox');
                const emp = $(this).data('employee');
                
                const isChecked = !$checkbox.prop('checked');
                $checkbox.prop('checked', isChecked);
                
                if (isChecked) {
                    if (!selectedEmployees.includes(emp)) {
                        selectedEmployees.push(emp);
                    }
                    $(this).css('background', '#f3e8ff').css('border-color', '#805ad5');
                } else {
                    selectedEmployees = selectedEmployees.filter(e => e !== emp);
                    $(this).css('background', COLORS.white).css('border-color', COLORS.border);
                }

                if (selectedEmployees.length > 0) {
                    $('#multi_select_actions').show();
                    $('#selected_count').text(`${selectedEmployees.length} selected`);
                } else {
                    $('#multi_select_actions').hide();
                }
            });

            setTimeout(function() {
                $('#view_selected_btn').off('click').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (selectedEmployees.length > 0) {
                        showMultipleEmployeeReflections([...selectedEmployees]);
                    } else {
                        frappe.msgprint('Please select at least one employee');
                    }
                });

                $('#clear_selection_btn').off('click').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectedEmployees = [];
                    renderCards(data);
                });
            }, 100);
        }

        renderCards(cardData);
        setupCardSearch(cardData, renderCards);
    }

    function showReflectionTable(field, label) {
        const records = [];
        filteredData.forEach(doc => {
            const text = doc[field];
            if (text && text.trim()) {
                records.push({
                    employee_name: doc.employee_name,
                    academic_year: doc.academic_year,
                    school_details: doc.school_details,
                    campus: doc.campus || 'N/A',
                    reflection_type: label,
                    reflection_content: text.trim()
                });
            }
        });

        if (!records.length) {
            $tableView.html(`<div style="padding:60px;text-align:center;color:#888;">No records for <strong>${label}</strong></div>`).fadeIn();
            return;
        }

        const backBtn = `<button id="back_btn" class="btn" style="background:${COLORS.secondary};color:white;padding:8px 16px;border-radius:6px;font-weight:600;">← Back</button>`;
        const exportBtns = `
            <div class="btn-group">
                <button id="pdf_btn" class="btn" style="background:${COLORS.primary};color:white;padding:8px 16px;border-radius:6px;">📄 PDF</button>
                <button id="excel_btn" class="btn" style="background:${COLORS.success};color:white;padding:8px 16px;border-radius:6px;">📊 Excel</button>
                <button id="csv_btn" class="btn" style="background:${COLORS.accent};color:white;padding:8px 16px;border-radius:6px;">📋 CSV</button>
            </div>`;

        $tableView.html(`
            <div style="background:${COLORS.white};padding:20px;border-radius:8px;border:1px solid ${COLORS.border};">
                <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
                    ${backBtn}
                    ${exportBtns}
                </div>
                <h5 style="color:#805ad5;font-weight:600;font-size:18px;">${label} (${records.length} records)</h5>
                ${renderReflectionsTable(records)}
            </div>
        `).fadeIn(600);
        $grid.fadeOut(300);

        $('#back_btn').off('click').on('click', () => $tableView.fadeOut(300, () => { $('#search_row').hide(); $searchInput.val(''); buildReflectionCards(); }));
        $('#pdf_btn').off('click').on('click', () => downloadAsPDF(label, records, false, false, false, true));
        $('#excel_btn').off('click').on('click', () => downloadAsExcel(label, records, false, false, false, true));
        $('#csv_btn').off('click').on('click', () => downloadAsCSV(label, records, false, false, false, true));
    }

    function showEmployeeReflections(employee) {
        const records = [];
        filteredData.forEach(doc => {
            if (doc.employee_name !== employee) return;
            REFLECTION_MODULES.forEach(m => {
                if (m.field === '__ALL__') return;
                const text = doc[m.field];
                if (text && text.trim()) {
                    records.push({
                        employee_name: doc.employee_name,
                        academic_year: doc.academic_year,
                        school_details: doc.school_details,
                        campus: doc.campus || 'N/A',
                        reflection_type: m.label,
                        reflection_content: text.trim()
                    });
                }
            });
        });

        if (!records.length) {
            $tableView.html(`<div style="padding:60px;text-align:center;color:#888;">No reflections for <strong>${employee}</strong></div>`).fadeIn();
            return;
        }

        const backBtn = `<button id="back_btn" class="btn" style="background:${COLORS.secondary};color:white;padding:8px 16px;border-radius:6px;font-weight:600;">← Back</button>`;
        const exportBtns = `
            <div class="btn-group">
                <button id="pdf_btn" class="btn" style="background:${COLORS.primary};color:white;padding:8px 16px;border-radius:6px;">📄 PDF</button>
                <button id="excel_btn" class="btn" style="background:${COLORS.success};color:white;padding:8px 16px;border-radius:6px;">📊 Excel</button>
                <button id="csv_btn" class="btn" style="background:${COLORS.accent};color:white;padding:8px 16px;border-radius:6px;">📋 CSV</button>
            </div>`;

        $tableView.html(`
            <div style="background:${COLORS.white};padding:20px;border-radius:8px;border:1px solid ${COLORS.border};">
                <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
                    ${backBtn}
                    ${exportBtns}
                </div>
                <h5 style="color:#805ad5;font-weight:600;font-size:18px;">Reflections - ${employee} (${records.length} records)</h5>
                ${renderReflectionsTable(records)}
            </div>
        `).fadeIn(600);
        $grid.fadeOut(300);

        $('#back_btn').off('click').on('click', () => $tableView.fadeOut(300, () => { $('#search_row').hide(); $searchInput.val(''); buildReflectionCards(); }));
        $('#pdf_btn').off('click').on('click', () => downloadAsPDF(`Reflections_${employee}`, records, false, false, false, true));
        $('#excel_btn').off('click').on('click', () => downloadAsExcel(`Reflections_${employee}`, records, false, false, false, true));
        $('#csv_btn').off('click').on('click', () => downloadAsCSV(`Reflections_${employee}`, records, false, false, false, true));
    }

    function showMultipleEmployeeReflections(employees) {
        const records = [];
        filteredData.forEach(doc => {
            if (!employees.includes(doc.employee_name)) return;
            REFLECTION_MODULES.forEach(m => {
                if (m.field === '__ALL__') return;
                const text = doc[m.field];
                if (text && text.trim()) {
                    records.push({
                        employee_name: doc.employee_name,
                        academic_year: doc.academic_year,
                        school_details: doc.school_details,
                        campus: doc.campus || 'N/A',
                        reflection_type: m.label,
                        reflection_content: text.trim()
                    });
                }
            });
        });

        if (!records.length) {
            $tableView.html(`<div style="padding:60px;text-align:center;color:#888;">No reflections found for selected employees</div>`).fadeIn();
            return;
        }

        records.sort((a, b) => a.employee_name.localeCompare(b.employee_name));

        const employeeList = employees.join(', ');
        const backBtn = `<button id="back_btn" class="btn" style="background:${COLORS.secondary};color:white;padding:8px 16px;border-radius:6px;font-weight:600;">← Back</button>`;
        const exportBtns = `
            <div class="btn-group">
                <button id="pdf_btn" class="btn" style="background:${COLORS.primary};color:white;padding:8px 16px;border-radius:6px;">📄 PDF</button>
                <button id="excel_btn" class="btn" style="background:${COLORS.success};color:white;padding:8px 16px;border-radius:6px;">📊 Excel</button>
                <button id="csv_btn" class="btn" style="background:${COLORS.accent};color:white;padding:8px 16px;border-radius:6px;">📋 CSV</button>
            </div>`;

        $tableView.html(`
            <div style="background:${COLORS.white};padding:20px;border-radius:8px;border:1px solid ${COLORS.border};">
                <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
                    ${backBtn}
                    ${exportBtns}
                </div>
                <h5 style="color:#805ad5;font-weight:600;font-size:18px;">Reflections - ${employees.length} Employee${employees.length > 1 ? 's' : ''} (${records.length} records)</h5>
                <p style="color:${COLORS.textLight}; font-size:13px; margin-bottom:15px;"><strong>Selected:</strong> ${employeeList}</p>
                ${renderReflectionsTable(records)}
            </div>
        `).fadeIn(600);
        $grid.fadeOut(300);

        $('#back_btn').off('click').on('click', () => $tableView.fadeOut(300, () => { $('#search_row').hide(); $searchInput.val(''); buildReflectionCards(); }));
        $('#pdf_btn').off('click').on('click', () => downloadAsPDF(`Multiple_Reflections_${employees.length}_Employees`, records, false, false, false, true));
        $('#excel_btn').off('click').on('click', () => downloadAsExcel(`Multiple_Reflections_${employees.length}_Employees`, records, false, false, false, true));
        $('#csv_btn').off('click').on('click', () => downloadAsCSV(`Multiple_Reflections_${employees.length}_Employees`, records, false, false, false, true));
    }

    function renderReflectionsTable(records) {
        let html = `<div style="overflow-x:auto;"><table class="table table-bordered" style="font-size:13px;border:1px solid ${COLORS.border};">
            <thead style="background:${COLORS.primary};color:white;"><tr>
                <th style="padding:10px;">#</th><th>Employee</th><th>Year</th><th>School</th><th>Campus</th><th>Type</th><th>Reflection</th>
            </tr></thead><tbody>`;
        records.forEach((r, i) => {
            const bg = i % 2 === 0 ? COLORS.white : COLORS.lightBg;
            html += `<tr style="background:${bg};">
                <td style="text-align:center;padding:10px;">${i + 1}</td>
                <td>${r.employee_name}</td>
                <td>${r.academic_year}</td>
                <td>${r.school_details}</td>
                <td>${r.campus}</td>
                <td>${r.reflection_type}</td>
                <td style="max-width:600px;word-wrap:break-word;">${r.reflection_content.replace(/\n/g, '<br>')}</td>
            </tr>`;
        });
        return html + `</tbody></table></div>`;
    }

    // ===================================================================
    // 11. OBJECTIVES – PER FACULTY CARD (3 COLUMNS)
    // ===================================================================
    function buildObjectivesCards() {
        $('#filter_label').text('Faculty');
        const $select = $('#type_filter').empty().append('<option value="">-- Select Faculty --</option>');

        const facultyList = [...new Set(filteredData.map(d => d.employee_name).filter(Boolean))].sort();
        const cardData = [];

        facultyList.forEach(faculty => {
            const count = filteredData.reduce((s, d) => s + (d.employee_name === faculty && Array.isArray(d.data_onnv) ? d.data_onnv.length : 0), 0);
            if (count > 0) {
                $select.append(`<option value="${faculty}">${faculty} (${count})</option>`);
                const doc = filteredData.find(d => d.employee_name === faculty);
                cardData.push({ employee: faculty, count, campus: doc?.campus || 'N/A' });
            }
        });

        $select.on('change', () => {
            const faculty = $select.val();
            if (faculty) showObjectives(faculty);
            else $tableView.fadeOut(300, () => $grid.fadeIn(400));
        });

        function renderCards(data) {
            let html = `<div style="background:${COLORS.white}; padding:25px; border-radius:8px; border:1px solid ${COLORS.border};">
                <h4 style="color:#5a67d8; border-bottom:2px solid #c3dafe; padding-bottom:12px; font-size:18px; font-weight:600;">Objectives (Per Faculty)</h4>
                <div class="row">`;
            data.forEach((item, i) => {
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="p-3 rounded module-box" data-faculty="${item.employee}"
                            style="background:${COLORS.white}; border:1px solid ${COLORS.border}; border-left:3px solid #5a67d8; cursor:pointer; transition:all 0.2s;">
                            <h6 style="color:${COLORS.textDark}; font-size:14px; font-weight:600; margin-bottom:4px;">${item.employee}</h6>
                            <small style="color:#5a67d8; font-weight:500;">${item.count} objective${item.count > 1 ? 's' : ''}</small>
                        </div>
                    </div>`;
            });
            html += `</div></div>`;
            $grid.html(html).fadeIn(500);
            $('.module-box').off('click').on('mouseenter', function() {
                $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.12)').css('transform', 'translateY(-2px)');
            }).on('mouseleave', function() {
                $(this).css('box-shadow', 'none').css('transform', 'translateY(0)');
            }).on('click', function () {
                const faculty = $(this).data('faculty');
                showObjectives(faculty);
            });
        }

        renderCards(cardData);
        setupCardSearch(cardData, renderCards);
    }

    function showObjectives(faculty) {
        const records = filteredData
            .filter(d => d.employee_name === faculty && Array.isArray(d.data_onnv))
            .flatMap(d => d.data_onnv.map(r => ({
                employee_name: d.employee_name,
                academic_year: d.academic_year,
                school_details: d.school_details,
                campus: d.campus || 'N/A',
                objective_category: r.objective_category || '-',
                objective_details: r.objective_details || '-'
            })));

        if (!records.length) {
            $tableView.html(`<div style="padding:60px;text-align:center;color:#888;">No objectives for <strong>${faculty}</strong></div>`).fadeIn();
            return;
        }

        const backBtn = `<button id="back_btn" class="btn" style="background:${COLORS.secondary};color:white;padding:8px 16px;border-radius:6px;font-weight:600;">← Back</button>`;
        const exportBtns = `
            <div class="btn-group">
                <button id="pdf_btn" class="btn" style="background:${COLORS.primary};color:white;padding:8px 16px;border-radius:6px;">📄 PDF</button>
                <button id="excel_btn" class="btn" style="background:${COLORS.success};color:white;padding:8px 16px;border-radius:6px;">📊 Excel</button>
                <button id="csv_btn" class="btn" style="background:${COLORS.accent};color:white;padding:8px 16px;border-radius:6px;">📋 CSV</button>
            </div>`;

        $tableView.html(`
            <div style="background:${COLORS.white};padding:20px;border-radius:8px;border:1px solid ${COLORS.border};">
                <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
                    ${backBtn}
                    ${exportBtns}
                </div>
                <h5 style="color:#5a67d8;font-weight:600;font-size:18px;">Objectives - ${faculty} (${records.length} records)</h5>
                ${renderObjectivesTable(records)}
            </div>
        `).fadeIn(600);
        $grid.fadeOut(300);

        $('#back_btn').off('click').on('click', () => $tableView.fadeOut(300, () => { $('#search_row').hide(); $searchInput.val(''); buildObjectivesCards(); }));
        $('#pdf_btn').off('click').on('click', () => downloadAsPDF(`Objectives_${faculty}`, records, false, true));
        $('#excel_btn').off('click').on('click', () => downloadAsExcel(`Objectives_${faculty}`, records, false, true));
        $('#csv_btn').off('click').on('click', () => downloadAsCSV(`Objectives_${faculty}`, records, false, true));
    }

    function renderObjectivesTable(records) {
        let html = `<div style="overflow-x:auto;"><table class="table table-bordered" style="font-size:13px;border:1px solid ${COLORS.border};">
            <thead style="background:${COLORS.primary};color:white;"><tr>
                <th style="padding:10px;">#</th><th>Employee</th><th>Year</th><th>School</th><th>Campus</th><th>Category</th><th>Details</th>
            </tr></thead><tbody>`;
        records.forEach((r, i) => {
            const bg = i % 2 === 0 ? COLORS.white : COLORS.lightBg;
            html += `<tr style="background:${bg};">
                <td style="text-align:center;padding:10px;">${i + 1}</td>
                <td>${r.employee_name}</td>
                <td>${r.academic_year}</td>
                <td>${r.school_details}</td>
                <td>${r.campus}</td>
                <td>${r.objective_category}</td>
                <td style="max-width:500px;word-wrap:break-word;">${r.objective_details}</td>
            </tr>`;
        });
        return html + `</tbody></table></div>`;
    }

    // ===================================================================
    // 12. OTHER SECTIONS (TABLES WITH CAMPUS) - 3 COLUMNS
    // ===================================================================
    function populateDropdown() {
        const $select = $('#type_filter').empty().append('<option value="">-- Select --</option>');
        const items = allSections[currentSection].modules;

        items.forEach(item => {
            const field = item.field;
            const label = item.label;
            const count = filteredData.reduce((s, d) => s + (Array.isArray(d[field]) ? d[field].length : 0), 0);
            if (count > 0) $select.append(`<option value="${field}">${label} (${count})</option>`);
        });

        $select.off('change').on('change', () => {
            const val = $select.val();
            if (val) showTable(val, items.find(m => m.field === val).label);
            else $tableView.fadeOut(300, () => $grid.fadeIn(400));
        });
    }

    function buildModuleGrid() {
        const section = allSections[currentSection];
        let html = `<div style="background:${COLORS.white}; padding:25px; border-radius:8px; border:1px solid ${COLORS.border};">
            <h4 style="color:${section.color}; border-bottom:2px solid ${section.color}40; padding-bottom:12px; font-size:18px; font-weight:600;">
                ${section.icon} ${section.title}
            </h4><div class="row">`;

        const items = section.modules;

        items.forEach((item, i) => {
            const field = item.field;
            const label = item.label;
            const count = filteredData.reduce((s, d) => s + (Array.isArray(d[field]) ? d[field].length : 0), 0);
            if (count > 0) {
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="p-3 rounded module-box" data-field="${field}"
                            style="background:${COLORS.white}; border:1px solid ${COLORS.border}; border-left:3px solid ${section.color}; cursor:pointer; transition:all 0.2s;">
                            <h6 style="color:${COLORS.textDark}; font-size:14px; font-weight:600; margin-bottom:4px;">${label}</h6>
                            <small style="color:${section.color}; font-weight:500;">${count} records</small>
                        </div>
                    </div>`;
            }
        });
        html += `</div></div>`;
        $grid.html(html).fadeIn(500);
        populateDropdown();
        $('.module-box').off('click').on('mouseenter', function() {
            $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.12)').css('transform', 'translateY(-2px)');
        }).on('mouseleave', function() {
            $(this).css('box-shadow', 'none').css('transform', 'translateY(0)');
        }).on('click', function () {
            $('#type_filter').val($(this).data('field')).trigger('change');
        });
    }

    function showTable(field, label) {
        let records = [];
        filteredData.forEach(doc => {
            if (Array.isArray(doc[field]) && doc[field].length > 0) {
                doc[field].forEach(rec => {
                    records.push({
                        employee_name: doc.employee_name || 'N/A',
                        academic_year: doc.academic_year || 'N/A',
                        school_details: doc.school_details || 'N/A',
                        campus: doc.campus || 'N/A',
                        ...rec
                    });
                });
            }
        });
        if (!records.length) {
            $tableView.html(`<div style="padding:60px; text-align:center; color:#888;">No records for <strong>${label}</strong></div>`).fadeIn();
            return;
        }

        const backBtn = `<button id="back_btn" class="btn" style="background:${COLORS.secondary}; color:white; padding:8px 16px; border-radius:6px; font-weight:600;">← Back</button>`;
        const exportBtns = `
            <div class="btn-group">
                <button id="pdf_btn" class="btn" style="background:${COLORS.primary}; color:white; padding:8px 16px; border-radius:6px;">📄 PDF</button>
                <button id="excel_btn" class="btn" style="background:${COLORS.success}; color:white; padding:8px 16px; border-radius:6px;">📊 Excel</button>
                <button id="csv_btn" class="btn" style="background:${COLORS.accent}; color:white; padding:8px 16px; border-radius:6px;">📋 CSV</button>
            </div>`;

        $tableView.html(`
            <div style="background:${COLORS.white}; padding:20px; border-radius:8px; border:1px solid ${COLORS.border};">
                <div style="margin-bottom:20px; display:flex; justify-content:space-between;">
                    ${backBtn}
                    ${exportBtns}
                </div>
                <h5 style="color:${allSections[currentSection].color}; font-weight:600; font-size:18px;">${label} (${records.length} records)</h5>
                ${renderGeneralTable(records)}
            </div>
        `).fadeIn(600);
        $grid.fadeOut(300);

        $('#back_btn').off('click').on('click', () => $tableView.fadeOut(300, () => { $('#search_row').hide(); $searchInput.val(''); $grid.fadeIn(400); $('#type_filter').val(''); }));
        $('#pdf_btn').off('click').on('click', () => downloadAsPDF(label, records));
        $('#excel_btn').off('click').on('click', () => downloadAsExcel(label, records));
        $('#csv_btn').off('click').on('click', () => downloadAsCSV(label, records));
    }

    function renderGeneralTable(records) {
        const keys = getKeys(records);
        let html = `<div style="overflow-x:auto;"><table class="table table-bordered" style="font-size:13px; border:1px solid ${COLORS.border};">
            <thead style="background:${allSections[currentSection]?.color || COLORS.primary}; color:white;"><tr>
                <th style="padding:10px; text-align:center;">#</th>
                <th style="padding:10px;">Employee</th>
                <th style="padding:10px;">Year</th>
                <th style="padding:10px;">School</th>
                <th style="padding:10px;">Campus</th>`;
        keys.forEach(k => html += `<th style="padding:10px; white-space:nowrap;">${formatField(k)}</th>`);
        html += `</tr></thead><tbody>`;

        records.forEach((r, i) => {
            const bg = i % 2 === 0 ? COLORS.white : COLORS.lightBg;
            html += `<tr style="background:${bg};">`;
            html += `<td style="text-align:center; padding:10px;">${i + 1}</td>
                    <td style="padding:10px;">${r.employee_name}</td>
                    <td style="padding:10px;">${r.academic_year}</td>
                    <td style="padding:10px;">${r.school_details}</td>
                    <td style="padding:10px;">${r.campus}</td>`;
            keys.forEach(k => {
                const v = r[k] != null ? String(r[k]) : '-';
                html += `<td style="padding:10px; max-width:300px; word-wrap:break-word;">${v}</td>`;
            });
            html += `</tr>`;
        });
        html += `</tbody></table></div>`;
        return html;
    }

    // ===================================================================
    // 13. EMPLOYEE SUMMARY (3 COLUMNS)
    // ===================================================================
    function showEmployeeSummary() {
        const employeeStats = {};
        
        filteredData.forEach(doc => {
            const emp = doc.employee_name || 'Unknown';
            if (!employeeStats[emp]) {
                employeeStats[emp] = {
                    name: emp,
                    year: doc.academic_year || 'N/A',
                    school: doc.school_details || 'N/A',
                    campus: doc.campus || 'N/A',
                    total: 0
                };
            }

            Object.keys(allSections).forEach(sectionKey => {
                if (sectionKey === 'reflection' || sectionKey === 'objectives') return;
                const modules = allSections[sectionKey].modules;
                modules.forEach(mod => {
                    const field = mod.field;
                    if (Array.isArray(doc[field])) {
                        employeeStats[emp].total += doc[field].length;
                    }
                });
            });
        });

        const cardData = Object.values(employeeStats)
            .filter(e => e.total > 0)
            .sort((a, b) => a.name.localeCompare(b.name));

        function renderCards(data) {
            let html = `<div style="background:${COLORS.white}; padding:25px; border-radius:8px; border:1px solid ${COLORS.border};">
                <h4 style="color:#1565c0; border-bottom:2px solid #bbdefb; padding-bottom:12px; font-size:18px; font-weight:600;">Employee Summary</h4>
                <div class="row">`;
            
            data.forEach((emp, i) => {
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="p-3 rounded" style="background:${COLORS.white}; border:1px solid ${COLORS.border}; border-left:3px solid #1565c0;">
                            <h6 style="color:${COLORS.textDark}; font-size:14px; font-weight:600; margin-bottom:4px;">${emp.name}</h6>
                            <div style="font-size:12px; color:${COLORS.textLight};">
                                <div><strong>Year:</strong> ${emp.year}</div>
                                <div><strong>School:</strong> ${emp.school}</div>
                                <div><strong>Campus:</strong> ${emp.campus}</div>
                                <div style="margin-top:6px;"><strong style="color:#1565c0;">Total Activities:</strong> ${emp.total}</div>
                            </div>
                        </div>
                    </div>`;
            });
            html += `</div></div>`;
            $grid.html(html).fadeIn(500);
        }

        renderCards(cardData);
        setupCardSearch(cardData.map(e => ({ employee: e.name, count: e.total, campus: e.campus })), (filtered) => {
            const filteredFull = cardData.filter(e => filtered.some(f => f.employee === e.name));
            renderCards(filteredFull);
        });
    }

    // ===================================================================
    // 14. ALL REFLECTIONS FUNCTION
    // ===================================================================
    function showAllReflections() {
        const records = [];
        filteredData.forEach(doc => {
            REFLECTION_MODULES.forEach(m => {
                if (m.field === '__ALL__') return;
                const text = doc[m.field];
                if (text && text.trim()) {
                    records.push({
                        employee_name: doc.employee_name,
                        academic_year: doc.academic_year,
                        school_details: doc.school_details,
                        campus: doc.campus || 'N/A',
                        reflection_type: m.label,
                        reflection_content: text.trim()
                    });
                }
            });
        });

        if (!records.length) {
            $tableView.html(`<div style="padding:60px;text-align:center;color:#888;">No reflections found</div>`).fadeIn();
            return;
        }

        const backBtn = `<button id="back_btn" class="btn" style="background:${COLORS.secondary};color:white;padding:8px 16px;border-radius:6px;font-weight:600;">← Back</button>`;
        const exportBtns = `
            <div class="btn-group">
                <button id="pdf_btn" class="btn" style="background:${COLORS.primary};color:white;padding:8px 16px;border-radius:6px;">📄 PDF</button>
                <button id="excel_btn" class="btn" style="background:${COLORS.success};color:white;padding:8px 16px;border-radius:6px;">📊 Excel</button>
                <button id="csv_btn" class="btn" style="background:${COLORS.accent};color:white;padding:8px 16px;border-radius:6px;">📋 CSV</button>
            </div>`;

        $tableView.html(`
            <div style="background:${COLORS.white};padding:20px;border-radius:8px;border:1px solid ${COLORS.border};">
                <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
                    ${backBtn}
                    ${exportBtns}
                </div>
                <h5 style="color:#805ad5;font-weight:600;font-size:18px;">All Reflections (${records.length} records)</h5>
                ${renderReflectionsTable(records)}
            </div>
        `).fadeIn(600);
        $grid.fadeOut(300);

        $('#back_btn').off('click').on('click', () => $tableView.fadeOut(300, () => { $('#search_row').hide(); $searchInput.val(''); buildReflectionCards(); }));
        $('#pdf_btn').off('click').on('click', () => downloadAsPDF('All_Reflections', records, false, false, false, true));
        $('#excel_btn').off('click').on('click', () => downloadAsExcel('All_Reflections', records, false, false, false, true));
        $('#csv_btn').off('click').on('click', () => downloadAsCSV('All_Reflections', records, false, false, false, true));
    }

    // ===================================================================
    // 15. EXPORT FUNCTIONS
    // ===================================================================
    function getKeys(records) {
        const keys = new Set();
        records.forEach(r => Object.keys(r).forEach(k => {
            if (!EXCLUDE_FIELDS.includes(k) && !['employee_name', 'academic_year', 'school_details', 'campus'].includes(k)) keys.add(k);
        }));
        return Array.from(keys).sort();
    }

    function formatField(name) {
        return name.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    }

    function downloadAsPDF(label, records, isReflection = false, isObjective = false, isEmployee = false, isAllReflections = false) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFillColor(0, 51, 102);
        doc.rect(0, 0, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Engagement Tracker', pageWidth / 2, 10, { align: 'center' });
        doc.setTextColor(0);
        doc.setFontSize(14);
        doc.text(label, pageWidth / 2, 25, { align: 'center' });

        let headers = [], data = [];

        if (isAllReflections || isReflection) {
            headers = [['#', 'Employee', 'Year', 'School', 'Campus', 'Type', 'Reflection']];
            data = records.map((r, i) => [i + 1, r.employee_name, r.academic_year, r.school_details, r.campus, r.reflection_type || '', (r.reflection_content || '').substring(0, 100) + '...']);
        } else if (isObjective) {
            headers = [['#', 'Employee', 'Year', 'School', 'Campus', 'Category', 'Details']];
            data = records.map((r, i) => [i + 1, r.employee_name, r.academic_year, r.school_details, r.campus, r.objective_category, (r.objective_details || '').substring(0, 80)]);
        } else if (isEmployee) {
            headers = [['#', 'Employee', 'Year', 'School', 'Campus']];
            data = records.map((r, i) => [i + 1, r.employee_name, r.academic_year, r.school_details, r.campus]);
        } else {
            const keys = getKeys(records);
            headers = [['#', 'Employee', 'Year', 'School', 'Campus'].concat(keys.map(formatField))];
            data = records.map((r, i) => [i + 1, r.employee_name, r.academic_year, r.school_details, r.campus].concat(keys.map(k => (r[k] || '').toString().substring(0, 60))));
        }

        doc.autoTable({ head: headers, body: data, startY: 30, theme: 'grid', headStyles: { fillColor: [0, 51, 102] }, styles: { fontSize: 8 } });
        doc.save(`${label.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    }

    function downloadAsExcel(label, records, isReflection = false, isObjective = false, isEmployee = false, isAllReflections = false) {
        let data = [];
        if (isAllReflections || isReflection) {
            data = records.map((r, i) => ({
                '#': i + 1, Employee: r.employee_name, Year: r.academic_year, School: r.school_details, Campus: r.campus,
                Type: r.reflection_type || '', Reflection: r.reflection_content
            }));
        } else if (isObjective) {
            data = records.map((r, i) => ({
                '#': i + 1, Employee: r.employee_name, Year: r.academic_year, School: r.school_details, Campus: r.campus,
                Category: r.objective_category, Details: r.objective_details
            }));
        } else if (isEmployee) {
            data = records.map((r, i) => ({ '#': i + 1, Employee: r.employee_name, Year: r.academic_year, School: r.school_details, Campus: r.campus }));
        } else {
            const keys = getKeys(records);
            data = records.map((r, i) => {
                const row = { '#': i + 1, Employee: r.employee_name, Year: r.academic_year, School: r.school_details, Campus: r.campus };
                keys.forEach(k => row[formatField(k)] = r[k]);
                return row;
            });
        }
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, `${label.replace(/[^a-z0-9]/gi, '_')}.xlsx`);
    }

    function downloadAsCSV(label, records, isReflection = false, isObjective = false, isEmployee = false, isAllReflections = false) {
        let csv = '';
        if (isAllReflections || isReflection) {
            csv = '#,Employee,Year,School,Campus,Type,Reflection\n' +
                records.map((r, i) => `${i + 1},"${r.employee_name}","${r.academic_year}","${r.school_details}","${r.campus}","${r.reflection_type || ''}","${(r.reflection_content || '').replace(/"/g, '""')}"`).join('\n');
        } else if (isObjective) {
            csv = '#,Employee,Year,School,Campus,Category,Details\n' +
                records.map((r, i) => `${i + 1},"${r.employee_name}","${r.academic_year}","${r.school_details}","${r.campus}","${r.objective_category}","${(r.objective_details || '').replace(/"/g, '""')}"`).join('\n');
        } else if (isEmployee) {
            csv = '#,Employee,Year,School,Campus\n' +
                records.map((r, i) => `${i + 1},"${r.employee_name}","${r.academic_year}","${r.school_details}","${r.campus}"`).join('\n');
        } else {
            const keys = getKeys(records);
            csv = '#,Employee,Year,School,Campus,' + keys.map(formatField).join(',') + '\n';
            csv += records.map((r, i) => [i + 1, r.employee_name, r.academic_year, r.school_details, r.campus].concat(keys.map(k => `"${(r[k] || '').toString().replace(/"/g, '""')}"`)).join(',')).join('\n');
        }
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${label.replace(/[^a-z0-9]/gi, '_')}.csv`);
    }

    // ===================================================================
    // 16. INIT
    // ===================================================================
    autoLoadData();
};