frappe.listview_settings['Engagement Tracker'] = {
    onload: function(listview) {
        // --- Custom Primary Button ---
        listview.page.clear_primary_action();
        listview.page.set_primary_action('Add Item', function() {
            frappe.new_doc('Engagement Tracker');
        });

        // --- Custom Scrollbar Style (Dark Green) ---
        const css = `
            /* Chrome, Edge, Safari */
            .form-grid .grid-body::-webkit-scrollbar {
                width: 10px !important;
                height: 10px !important;
            }
            .form-grid .grid-body::-webkit-scrollbar-track {
                background: #111827 !important; /* Dark black track */
                border-radius: 10px !important;
            }
            .form-grid .grid-body::-webkit-scrollbar-thumb {
                background: #065f46 !important; /* Dark green thumb */
                border-radius: 10px !important;
                border: 2px solid #111827 !important;
            }
            .form-grid .grid-body::-webkit-scrollbar-thumb:hover {
                background: #064e3b !important; /* Darker hover */
            }

            /* Firefox */
            .form-grid .grid-body {
                scrollbar-color: #065f46 #111827 !important;
                scrollbar-width: thin !important;
            }
        `;

        // Inject CSS only once
        if (!document.getElementById('engagement-scrollbar-style')) {
            const style = document.createElement('style');
            style.id = 'engagement-scrollbar-style';
            style.innerHTML = css;
            document.head.appendChild(style);
        }
    }
};
