document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileList = document.getElementById('fileList');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    const storageInfo = document.getElementById('storageInfo');
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    const MAX_STORAGE_SIZE = 10 * 1024 * 1024; // 10 MB for example

    function updateStorageInfo() {
        const usedSpace = uploadedFiles.reduce((total, file) => total + file.size, 0);
        const freeSpace = MAX_STORAGE_SIZE - usedSpace;
        storageInfo.textContent = `Used: ${(usedSpace / 1024 / 1024).toFixed(2)} MB, Free: ${(freeSpace / 1024 / 1024).toFixed(2)} MB`;
    }

    function saveToLocalStorage() {
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        updateStorageInfo();
    }

    uploadBtn.addEventListener('click', () => {
        const files = fileInput.files;
        if (files.length === 0) {
            alert('Please select a file.');
            return;
        }

        const totalSize = Array.from(files).reduce((total, file) => total + file.size, 0);
        const usedSpace = uploadedFiles.reduce((total, file) => total + file.size, 0);
        if (usedSpace + totalSize > MAX_STORAGE_SIZE) {
            alert('Not enough storage space.');
            return;
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
            uploadedFiles.push({
                name: file.name,
                size: file.size,
                type: file.type,
                content: URL.createObjectURL(file) // This is not ideal, but for demonstration
            });
            const li = document.createElement('li');
            li.textContent = file.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
                saveToLocalStorage();
            });

            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download';
            downloadBtn.classList.add('downloadBtn');
            downloadBtn.addEventListener('click', () => {
                downloadFile(file);
            });

            li.appendChild(deleteBtn);
            li.appendChild(downloadBtn);
            fileList.appendChild(li);
        }
        saveToLocalStorage();
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

    function loadFiles() {
        uploadedFiles.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
                saveToLocalStorage();
            });

            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download';
            downloadBtn.classList.add('downloadBtn');
            downloadBtn.addEventListener('click', () => {
                const blob = new Blob([file.content], { type: file.type });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            li.appendChild(deleteBtn);
            li.appendChild(downloadBtn);
            fileList.appendChild(li);
        });
        updateStorageInfo();
    }

    loadFiles();
});
