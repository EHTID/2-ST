document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileList = document.getElementById('fileList');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    let uploadedFiles = [];

    uploadBtn.addEventListener('click', () => {
        const files = fileInput.files;
        if (files.length === 0) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append('files[]', file);
        }

        const fakeUpload = (files) => {
            let totalSize = 0;
            for (const file of files) {
                totalSize += file.size;
            }

            let uploaded = 0;
            const interval = setInterval(() => {
                if (uploaded < totalSize) {
                    const progress = (uploaded / totalSize) * 100;
                    uploadProgress.value = progress;
                    progressPercentage.textContent = `${progress.toFixed(2)}%`;
                    uploaded += totalSize * 0.1;
                } else {
                    clearInterval(interval);
                    uploadProgress.value = 100;
                    progressPercentage.textContent = '100%';
                    alert('Files uploaded successfully!');
                    addFilesToList(files);
                }
            }, 100);
        };

        fakeUpload(files);
    });

    function addFilesToList(files) {
        for (const file of files) {
            uploadedFiles.push(file);
            const li = document.createElement('li');
            li.textContent = file.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                li.remove();
                uploadedFiles = uploadedFiles.filter(f => f !== file);
            });

            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download';
            downloadBtn.addEventListener('click', () => {
                downloadFile(file);
            });

            li.appendChild(deleteBtn);
            li.appendChild(downloadBtn);
            fileList.appendChild(li);
        }
    }

    function downloadFile(file) {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
