/**
 * Tailwind CSS Configuration
 * Custom theme configuration for ParentPlanner
 */

// Apply Tailwind configuration
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    // primary brand colors
                    primary: '#4F46E5',        // indigo blue
                    secondary: '#7C3AED',      // purple
                    accent: '#F59E0B',         // amber/yellow accent
                    accentBlue: '#06B6D4',     // cyan accent
                    
                    // layout
                    neutral: '#F8FAFC',        // light gray
                    surface: '#FFFFFF',        // white
                    border: '#E2E8F0',         // light gray
                    textGray: '#64748B',       // slate gray
                },
                
                // shadows
                boxShadow: {
                    'md': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    'lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                
                //fonts
                fontFamily: {
                    'sans': ['Poppins', 'Nunito', 'system-ui', 'sans-serif'],
                    'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
                },
                
                // gradient backgrounds
                backgroundImage: {
                    'gradient-main': 'linear-gradient(90deg, hsla(339, 100%, 55%, 1) 0%, hsla(197, 100%, 64%, 1) 100%)',
                    'gradient-hover': 'linear-gradient(90deg, hsla(339, 100%, 50%, 1) 0%, hsla(197, 100%, 59%, 1) 100%)',
                },
            }
        },
        plugins: []
    };
}
