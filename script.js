document.getElementById("orderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const college = document.getElementById("college").value;
    const subject = document.getElementById("subject").value;
    const service = document.getElementById("service").value;
    const details = document.getElementById("details").value;
    const date = document.getElementById("date").value;

    const message =
        "MELOX NEW ORDER\n\n" +
        "Name: " + name + "\n" +
        "WhatsApp: " + phone + "\n" +
        "College / Class: " + college + "\n" +
        "Subject: " + subject + "\n" +
        "Service: " + service + "\n\n" +
        "Work Details:\n" +
        details + "\n\n" +
        "Required Date: " + date;

    const whatsappURL =
        "https://wa.me/919180257554?text=" +
        encodeURIComponent(message);

    window.location.href = whatsappURL;
});
