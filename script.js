document.getElementById("orderForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const college = document.getElementById("college").value;
    const subject = document.getElementById("subject").value;
    const service = document.getElementById("service").value;
    const details = document.getElementById("details").value;
    const date = document.getElementById("date").value;
    const fileInput = document.getElementById("file");

    let fileMessage = "No reference file uploaded.";

    // Upload file to MELOX backend
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        try {
            const uploadResponse = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData
            });

            const uploadResult = await uploadResponse.json();

            if (uploadResult.success) {
                fileMessage = "Reference File: " + uploadResult.filename;
            } else {
                alert("File upload failed.");
                return;
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to MELOX server.");
            return;
        }
    }

    const message =
        "MELOX NEW ORDER\n\n" +
        "Name: " + name + "\n" +
        "WhatsApp: " + phone + "\n" +
        "College / Class: " + college + "\n" +
        "Subject: " + subject + "\n" +
        "Service: " + service + "\n\n" +
        "Work Details:\n" +
        details + "\n\n" +
        "Required Date: " + date + "\n\n" +
        fileMessage;

    const whatsappNumber = "919180257554";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});