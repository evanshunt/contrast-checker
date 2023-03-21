var $93cb358e2e4aedc5$var$n = .2126, $93cb358e2e4aedc5$var$r = .7152, $93cb358e2e4aedc5$var$t = .0722, $93cb358e2e4aedc5$var$e = 1 / 12.92;
function $93cb358e2e4aedc5$var$u(n) {
    return Math.pow((n + .055) / 1.055, 2.4);
}
function $93cb358e2e4aedc5$var$a(a) {
    var i = a[0] / 255, c = a[1] / 255, o = a[2] / 255, s = i <= .03928 ? i * $93cb358e2e4aedc5$var$e : $93cb358e2e4aedc5$var$u(i), f = c <= .03928 ? c * $93cb358e2e4aedc5$var$e : $93cb358e2e4aedc5$var$u(c), l = o <= .03928 ? o * $93cb358e2e4aedc5$var$e : $93cb358e2e4aedc5$var$u(o);
    return s * $93cb358e2e4aedc5$var$n + f * $93cb358e2e4aedc5$var$r + l * $93cb358e2e4aedc5$var$t;
}
function $93cb358e2e4aedc5$var$i(n) {
    var r = 255;
    8 === (n = n.replace(/^#/, "")).length && (r = parseInt(n.slice(6, 8), 16), n = n.substring(0, 6)), 4 === n.length && (r = parseInt(n.slice(3, 4).repeat(2), 16), n = n.substring(0, 3)), 3 === n.length && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]);
    var t = parseInt(n, 16);
    return [
        t >> 16,
        t >> 8 & 255,
        255 & t,
        r
    ];
}
function $93cb358e2e4aedc5$export$5c6e3c2b59b7fbbe(n, r) {
    return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function $93cb358e2e4aedc5$export$8972dc0e6ad9238f(n, r) {
    return $93cb358e2e4aedc5$export$5c6e3c2b59b7fbbe($93cb358e2e4aedc5$var$a(n), $93cb358e2e4aedc5$var$a(r));
}
function $93cb358e2e4aedc5$export$834dfc94dde4b3d8(n, r) {
    return $93cb358e2e4aedc5$export$8972dc0e6ad9238f($93cb358e2e4aedc5$var$i(n), $93cb358e2e4aedc5$var$i(r));
}
function $93cb358e2e4aedc5$export$e55b6242cf16bbb8(n) {
    return n >= 7 ? "AAA" : n >= 4.5 ? "AA" : n >= 3 ? "AA Large" : "Fail";
}


const $2776a60caf88deef$var$icon = {
    AAA: "<span style='color: #1ECBE1'>✓</span>",
    pass: "<span style='color: #6AE11E'>✓</span>",
    meh: "<span style='color: #E1831E'>✓</span>",
    fail: "<span style='color: #E1341E'>X</span>"
};
let $2776a60caf88deef$var$bgFields = [];
function $2776a60caf88deef$var$bgIconFromScore(score) {
    if (score >= 7) return $2776a60caf88deef$var$icon.AAA;
    else if (score >= 4.5) return $2776a60caf88deef$var$icon.pass;
    else if (score >= 3) return $2776a60caf88deef$var$icon.meh;
    else return $2776a60caf88deef$var$icon.fail;
}
function $2776a60caf88deef$var$linkIconFromScore(score) {
    if (score >= 3) return $2776a60caf88deef$var$icon.pass;
    else return $2776a60caf88deef$var$icon.fail;
}
function $2776a60caf88deef$var$checkBgs(field, textColor, linkColor) {
    const backgroundColor = $2776a60caf88deef$var$hexFormat(field.value);
    const textBgScore = (0, $93cb358e2e4aedc5$export$834dfc94dde4b3d8)(backgroundColor, textColor).toFixed(2);
    const textBgPass = (0, $93cb358e2e4aedc5$export$e55b6242cf16bbb8)(textBgScore);
    const textIcon = $2776a60caf88deef$var$bgIconFromScore(textBgScore);
    const linkBgScore = (0, $93cb358e2e4aedc5$export$834dfc94dde4b3d8)(backgroundColor, linkColor).toFixed(2);
    const linkBgPass = (0, $93cb358e2e4aedc5$export$e55b6242cf16bbb8)(linkBgScore);
    const linkIcon = $2776a60caf88deef$var$bgIconFromScore(linkBgScore);
    const results = field.closest(".info").nextElementSibling;
    results.style.backgroundColor = backgroundColor;
    results.style.color = textColor;
    results.querySelector("p").innerHTML = `
                Tu quoque, Brute, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast" style="color:${linkColor}">fili mi </a>, nihil timor populi, nihil!
            `;
    results.querySelector("dl").innerHTML = `
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
function $2776a60caf88deef$var$hexFormat(value) {
    if (value[0] !== "#") return "#" + value;
    return value;
}
function $2776a60caf88deef$var$checkLinks(textInput, linkInput) {
    const textColor = $2776a60caf88deef$var$hexFormat(textInput.value);
    const linkColor = $2776a60caf88deef$var$hexFormat(linkInput.value);
    const linkScore = (0, $93cb358e2e4aedc5$export$834dfc94dde4b3d8)(linkColor, textColor).toFixed(2);
    const linkPass = linkScore >= 3 ? "Yes" : "No";
    const linkIcon = $2776a60caf88deef$var$linkIconFromScore(linkScore);
    const results = textInput.closest(".info").nextElementSibling;
    results.style.color = textColor;
    results.querySelector("p").innerHTML = `
                Tu quoque, Brute, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G183.html" style="color:${linkColor}">fili mi </a>, nihil timor populi, nihil!
            `;
    results.querySelector("dl").innerHTML = `
                <dt>Link vs Text Contrast Ratio</dt>
                <dd>${linkScore}</dd>
                <dt>WCAG 2.0 Rating</dt>
                <dd>${linkPass}${linkIcon}</dd>
            `;
}
function $2776a60caf88deef$var$updateUrl(field, params) {
    params.set(field.name, encodeURIComponent(field.value));
    window.history.pushState({}, "", "?" + params.toString());
}
const $2776a60caf88deef$var$params = new URLSearchParams(window.location.search);
$2776a60caf88deef$var$params.forEach((value, key)=>{
    document.querySelector(`input[name="${key}"]`).value = decodeURIComponent(value);
});
document.querySelectorAll("section").forEach((section)=>{
    const sectionString = section.className;
    const textInput = section.querySelector('input[name="' + sectionString + '-text-color"]');
    const linkInput = section.querySelector('input[name="' + sectionString + '-link-color"]');
    $2776a60caf88deef$var$checkLinks(textInput, linkInput);
    textInput.addEventListener("input", (event)=>{
        $2776a60caf88deef$var$updateUrl(event.target, $2776a60caf88deef$var$params);
        $2776a60caf88deef$var$checkLinks(event.target, linkInput);
        $2776a60caf88deef$var$bgFields.forEach((field)=>{
            $2776a60caf88deef$var$checkBgs(field, event.target.value, linkInput.value);
        });
    });
    linkInput.addEventListener("input", (event)=>{
        $2776a60caf88deef$var$updateUrl(event.target, $2776a60caf88deef$var$params);
        $2776a60caf88deef$var$checkLinks(textInput, event.target);
        $2776a60caf88deef$var$bgFields.array.forEach((element)=>{
            $2776a60caf88deef$var$checkBgs(element, textInput.value, event.target.value);
        });
    });
    const textColor = $2776a60caf88deef$var$hexFormat(textInput.value);
    const linkColor = $2776a60caf88deef$var$hexFormat(linkInput.value);
    section.querySelectorAll(`input[name^="${sectionString}-color"]`).forEach((field)=>{
        $2776a60caf88deef$var$bgFields.push(field);
        $2776a60caf88deef$var$checkBgs(field, textColor, linkColor);
        field.addEventListener("input", (event)=>{
            $2776a60caf88deef$var$updateUrl(event.target, $2776a60caf88deef$var$params);
            $2776a60caf88deef$var$checkBgs(event.target, textColor, linkColor);
        });
    });
});


//# sourceMappingURL=index.js.map
