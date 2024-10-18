/**
 * @returns {Object} A mapping of ansi escape codes to their
 * tailwind color equivalents. The key is the ansi escape code
 * and the value is the tailwind color class.
 */
function getAnsiColorMap() {
    return {
        '30': '#374151', // Gray 700
        '31': '#f87171', // Red 400
        '32': '#34d399', // Green 400
        '33': '#fbbf24', // Yellow 400
        '34': '#60a5fa', // Blue 400
        '35': '#a78bfa', // Purple 400
        '36': '#22d3ee', // Cyan 400
        '37': '#f3f4f6', // Gray 100
        '90': '#9ca3af', // Bright Gray 400
        '91': '#f87171', // Bright Red 400
        '92': '#34d399', // Bright Green 400
        '93': '#fde047', // Bright Yellow 300
        '94': '#60a5fa', // Bright Blue 400
        '95': '#c084fc', // Bright Purple 300
        '96': '#22d3ee', // Bright Cyan 400
        '97': '#f9fafb', // Bright White (Gray 50)
    };
}



function getAnsiBackgroundColorMap() {
    return {
        '40': '#374151', // Background gray 700
        '41': '#f87171', // Background red 400
        '42': '#34d399', // Background green 400
        '43': '#fbbf24', // Background yellow 400
        '44': '#60a5fa', // Background blue 400
        '45': '#a78bfa', // Background purple 400
        '46': '#22d3ee', // Background cyan 400
        '47': '#f3f4f6', // Background gray 100
        '100': '#9ca3af', // Bright background gray
        '101': '#f87171', // Bright background red
        '102': '#34d399', // Bright background green
        '103': '#fde047', // Bright background yellow 300
        '104': '#60a5fa', // Bright background blue
        '105': '#c084fc', // Bright background purple
        '106': '#22d3ee', // Bright background cyan
        '107': '#f9fafb', // Bright background white (Gray 50)
    };
}


/**
 * Converts a string containing ANSI escape sequences to a string of HTML
 * where the ansi escape sequences are replaced with equivalent HTML
 * styles. The function supports the ansi escape sequences for:
 * - foreground color
 * - background color
 * - bold
 * - italic
 * - underline
 * - blink
 * - line-through
 * - reset
 * - erase line
 *
 * @param {string} ansiText the string containing the ansi escape sequences
 * @returns {string} the string with the ansi escape sequences replaced with
 * equivalent HTML styles
 */
function ansiToHtml(ansiText) {
    const regex = /(\x1b\[([0-9;]*)m|\x1b\[([0-9]*)K)|(\[|\])/g;
    ansiText = ansiText.replace(/\x1b\[2K/g, '');

    const ansiColorMap = getAnsiColorMap();
    const ansiBackgroundColorMap = getAnsiBackgroundColorMap();

    let html = '';
    let currentStyles = [];
    let lastIndex = 0;
    let match;
    let openBracket = false;

    while ((match = regex.exec(ansiText)) !== null) {
        html += escapeHtml(ansiText.substring(lastIndex, match.index));

        if (match[0] === '[') {
            html += '[';
            openBracket = true;
        } else if (match[0] === ']') {
            if (currentStyles.length > 0) {
                html += '</span>';
            }
            html += ']';
            openBracket = false;
        } else {
            const codes = match[2] ? match[2].split(';') : [];
            let newSpan = false;

            for (const code of codes) {
                if (code === '0' || code === '') {
                    // Close all open spans
                    if (currentStyles.length > 0) {
                        html += '</span>';
                    }
                    currentStyles = [];
                    newSpan = false;
                } else if (code === '1') {
                    currentStyles.push('font-weight:bold');
                    newSpan = true;
                } else if (code === '3') {
                    currentStyles.push('font-style:italic');
                    newSpan = true;
                } else if (code === '4') {
                    currentStyles.push('text-decoration:underline');
                    newSpan = true;
                } else if (code === '5') {
                    currentStyles.push('text-decoration:blink');
                    newSpan = true;
                } else if (code === '9') {
                    currentStyles.push('text-decoration:line-through');
                    newSpan = true;
                } else if (ansiColorMap[code]) {
                    currentStyles = currentStyles.filter(style => !style.startsWith('color:'));
                    currentStyles.push(`color:${ansiColorMap[code]}`);
                    newSpan = true;
                } else if (ansiBackgroundColorMap[code]) {
                    currentStyles = currentStyles.filter(style => !style.startsWith('background-color:'));
                    currentStyles.push(`background-color:${ansiBackgroundColorMap[code]}`);
                    newSpan = true;
                }
            }

            if (newSpan) {
                if (currentStyles.length > 0) {
                    html += '</span>';
                }
                html += `<span style="${currentStyles.join(';')}">`;
            }
        }

        lastIndex = regex.lastIndex;
    }

    html += escapeHtml(ansiText.substring(lastIndex));

    // Close any remaining open spans
    if (currentStyles.length > 0) {
        html += '</span>';
    }

    return html;
}
/**
 * Replace special characters in a string of HTML with their corresponding
 * HTML entities to prevent XSS attacks.
 *
 * @param {string} text - The string to escape.
 *
 * @returns {string} The escaped string.
 */
function escapeHtml(text) {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return text.replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}
