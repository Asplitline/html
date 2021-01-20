
function serializeJson(form) {
    let arr = form.serializeArray();
    let json = {};
    arr.forEach(item => {
        json[item.name] = item.value;
    })
    return json;
}
