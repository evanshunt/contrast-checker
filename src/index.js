import { hex, score } from "wcag-contrast";

const icon = {
    AAA:  "<span style='color: #1ECBE1'>✓</span>",
    pass: "<span style='color: #6AE11E'>✓</span>",
    meh: "<span style='color: #E1831E'>✓</span>",
    fail: "<span style='color: #E1341E'>X</span>"
};

let bgFields = [];

function bgIconFromScore(score) {
    if (score >= 7) {
        return icon.AAA;
    } else if (score >= 4.5) {
        return icon.pass;
    } else if (score >= 3) {
        return icon.meh;
    } else {
        return icon.fail;
    }
}

function linkIconFromScore(score) {
    if (score >= 3) {
        return icon.pass;
    } else {
        return icon.fail;
    }
}

function checkBgs(field, textColor, linkColor) {
    const backgroundColor = hexFormat(field.value);
    const textBgScore = hex(backgroundColor, textColor).toFixed(2);
    const textBgPass = score(textBgScore);
    const textIcon = bgIconFromScore(textBgScore);
    const linkBgScore = hex(backgroundColor, linkColor).toFixed(2);
    const linkBgPass = score(linkBgScore);
    const linkIcon = bgIconFromScore(linkBgScore);
    const results = field.closest('.info').nextElementSibling;
    results.style.backgroundColor = backgroundColor;
    results.style.color = textColor;
    results.querySelector('p').innerHTML = `
                Tu quoque, Brute, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast" style="color:${linkColor}">fili mi </a>, nihil timor populi, nihil!
            `;
    results.querySelector('dl').innerHTML = `
                <dt>Text vs Bg Contrast Ratio</dt>
                <dd>${textBgScore}</dd>
                <dt>Text vs Bg WCAG 2.0 Rating</dt>
                <dd>${textBgPass}${textIcon}</dd>
                <dt>Link vs Bg Contrast Ratio</dt>
                <dd>${linkBgScore}</dd>
                <dt>Link vs Bg WCAG 2.0 Rating</dt>
                <dd>${linkBgPass}${linkIcon}</dd>
            `;
}

function hexFormat(value) {
    if (value[0] !== '#') {
        return '#' + value;
    };

    return value;
}

function checkLinks(textInput, linkInput) {
    const textColor = hexFormat(textInput.value);
    const linkColor = hexFormat(linkInput.value);
    const linkScore = hex(linkColor, textColor).toFixed(2);
    const linkPass = linkScore >= 3 ? 'Yes' : 'No';
    const linkIcon = linkIconFromScore(linkScore);
    const results = textInput.closest('.info').nextElementSibling;
    results.style.color = textColor;
    results.querySelector('p').innerHTML = `
                Tu quoque, Brute, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G183.html" style="color:${linkColor}">fili mi </a>, nihil timor populi, nihil!
            `;
    results.querySelector('dl').innerHTML = `
                <dt>Link vs Text Contrast Ratio</dt>
                <dd>${linkScore}</dd>
                <dt>WCAG 2.0 Rating</dt>
                <dd>${linkPass}${linkIcon}</dd>
            `;
}

function updateUrl(field, params) {
    params.set(field.name, encodeURIComponent(field.value));
    window.history.pushState({}, '', '?' + params.toString());
}

const params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
    document.querySelector(`input[name="${key}"]`).value = decodeURIComponent(value);
});

document.querySelectorAll('section').forEach((section) => {
    const sectionString = section.className;
    const textInput = section.querySelector('input[name="' + sectionString + '-text-color"]');
    const linkInput = section.querySelector('input[name="' + sectionString + '-link-color"]');
    checkLinks(textInput, linkInput);
    textInput.addEventListener('input', (event) => {
        updateUrl(event.target, params);
        checkLinks(event.target, linkInput);
        bgFields.forEach((field) => {
            checkBgs(field, event.target.value, linkInput.value);
        });
    });
    linkInput.addEventListener('input', (event) => {
        updateUrl(event.target, params);
        checkLinks(textInput, event.target);
        bgFields.array.forEach(element => {
            checkBgs(element, textInput.value, event.target.value);
        });
    });

    const textColor = hexFormat(textInput.value);
    const linkColor = hexFormat(linkInput.value);
    section.querySelectorAll(`input[name^="${sectionString}-color"]`).forEach((field) => {
        bgFields.push(field);
        checkBgs(field, textColor, linkColor);
        field.addEventListener('input', (event) => {
            updateUrl(event.target, params);
            checkBgs(event.target, textColor, linkColor);
        });
    });
});

