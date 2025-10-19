const page = document.body.dataset.page;
if (page === "upload") {
  const uploadBox = document.getElementById("uploadBox");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const loading = document.getElementById("loading");

  uploadBox.addEventListener("click", () => fileInput.click());

  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
  });

  uploadBox.addEventListener("dragleave", () =>
    uploadBox.classList.remove("dragover")
  );

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
    handleFile(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

  function handleFile(file) {
    if (!file.type.startsWith("image/")) {
      alert("Image files only please!");
      return;
    }

    const objectURL = URL.createObjectURL(file);
    preview.src = objectURL;
    preview.style.display = "block";
    document.getElementById("submitBtn").style.display = "block";
    document.getElementById("submitBtn").onclick = () => startUpload(objectURL);
  }

  function startUpload(imgURL) {
    loading.style.display = "block";
    const desc = encodeURIComponent(
      document.getElementById("description-box").value
    );
    const imgSrc = encodeURIComponent(preview.src);

    setTimeout(() => {
      window.location.href =
        "post.html?img=" + encodeURIComponent(imgURL) + "&desc=" + desc;
    }, 2000);
  }
}
if (page === "post") {
  const params = new URLSearchParams(location.search);
  const img = params.get("img");
  const uploadedImage = document.getElementById("uploadedImage");

  if (img && uploadedImage) {
    uploadedImage.src = img;
  }
  const desc = params.get("desc");
  if (desc) {
    document.getElementById("post-des").innerText = decodeURIComponent(desc);
  }
}
