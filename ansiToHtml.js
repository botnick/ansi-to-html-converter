/**
 * @typedef {Object} AnsiToHtmlOptions
 * @property {string} ansiText - ANSI text that needs to be converted.
 */

/**
 * Converts ANSI escape sequences in a text to HTML with corresponding styles.
 * @param {AnsiToHtmlOptions['ansiText']} ansiText - The ANSI text to be converted.
 * @returns {string} HTML formatted string with styles corresponding to ANSI codes.
 * @author {@link https://github.com/botnick botnick}
 */
function ansiToHtml(ansiText) {
    const regex = /\x1b\[([0-9;]*)m|\x1b\[([0-9]*)K/g;

    // Erase line sequences are removed
    ansiText = ansiText.replace(/\x1b\[2K/g, '');

    // Color and background color mappings for ANSI codes
    const ansiColorMap = {
        '30': '#374151', '31': '#f87171', '32': '#34d399', '33': '#fbbf24',
        '34': '#60a5fa', '35': '#a78bfa', '36': '#22d3ee', '37': '#f3f4f6',
        '90': '#9ca3af', '91': '#f87171', '92': '#34d399', '93': '#fde047',
        '94': '#60a5fa', '95': '#c084fc', '96': '#22d3ee', '97': '#f9fafb',
    };

    const ansiBackgroundColorMap = {
        '40': '#374151', '41': '#f87171', '42': '#34d399', '43': '#fbbf24',
        '44': '#60a5fa', '45': '#a78bfa', '46': '#22d3ee', '47': '#f3f4f6',
        '100': '#9ca3af', '101': '#f87171', '102': '#34d399', '103': '#fde047',
        '104': '#60a5fa', '105': '#c084fc', '106': '#22d3ee', '107': '#f9fafb',
    };

    let html = '';
    let currentStyles = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(ansiText)) !== null) {
        html += escapeHtml(ansiText.substring(lastIndex, match.index));

        const codes = match[1].split(';');
        for (const code of codes) {
            switch (code) {
                case '0': currentStyles = []; html += '</span>'; break;
                case '1': currentStyles.push('font-weight:bold'); break;
                case '3': currentStyles.push('font-style:italic'); break;
                case '4': currentStyles.push('text-decoration:underline'); break;
                case '5': currentStyles.push('text-decoration:blink'); break;
                case '9': currentStyles.push('text-decoration:line-through'); break;
                default:
                    if (ansiColorMap[code]) currentStyles.push(`color:${ansiColorMap[code]}`);
                    else if (ansiBackgroundColorMap[code]) currentStyles.push(`background-color:${ansiBackgroundColorMap[code]}`);
            }
        }

        if (currentStyles.length > 0) {
            html += `<span style="${currentStyles.join(';')}">`;
        }

        lastIndex = regex.lastIndex;
    }

    html += escapeHtml(ansiText.substring(lastIndex));
    html += '</span>'.repeat(currentStyles.filter(s => s.startsWith('color') || s.startsWith('background-color') || s === 'font-weight:bold').length);

    return html;
}

/**
 * Escapes HTML special characters to prevent XSS or display issues.
 * @param {string} text - The input text that needs escaping.
 * @returns {string} Escaped HTML string.
 * @author {@link https://github.com/botnick botnick}
 */
function escapeHtml(text) {
    const entityMap = {
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
        "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
    };
    return text.replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}
