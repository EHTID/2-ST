document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAcApNqe43fz4XAlmzBYnY0Nc_OOUgoBm0",
        authDomain: "ehtid-b19af.firebaseapp.com",
        projectId: "ehtid-b19af",
        storageBucket: "ehtid-b19af.appspot.com",
        messagingSenderId: "803299970129",
        appId: "1:803299970129:web:b7f9bd1600d1598215bc70"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const storage = firebase.storage();
    
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileList = document.getElementById('fileList');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    const storageInfo = document.getElementById('storageInfo');
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    function updateStorageInfo() {
        const usedSpace = uploadedFiles.reduce((total, file) => total + file.size, 0);
        const freeSpace = 1024 * 1024 * 1024 - usedSpace; // Example: 1GB quota
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

        Array.from(files).forEach(file => {
            const storageRef = storage.ref(file.name);
            const uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', 
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadProgress.value = progress;
                    progressPercentage.textContent = `${progress.toFixed(2)}%`;
                }, 
                error => {
                    console.error('Upload failed:', error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        uploadedFiles.push({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            url: downloadURL
                        });
                        saveToLocalStorage();
                        addFileToList(file.name, downloadURL, file.size);
                        uploadProgress.value = 0;
                        progressPercentage.textContent = '0%';
                    });
                }
            );
        });
    });

    function addFileToList(name, url, size) {
        const li = document.createElement('li');
        li.textContent = name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', () => {
            const fileRef = storage.ref(name);
            fileRef.delete().then(() => {
                li.remove();
                uploadedFiles = uploadedFiles.filter(file => file.name !== name);
                saveToLocalStorage();
            }).catch(error => {
                console.error('Error deleting file:', error);
            });
        });

        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download';
        downloadBtn.classList.add('downloadBtn');
        downloadBtn.addEventListener('click', () => {
            window.location.href = url;
        });

        li.appendChild(deleteBtn);
        li.appendChild(downloadBtn);
        fileList.appendChild(li);
    }

    function loadFiles() {
        uploadedFiles.forEach(file => {
            addFileToList(file.name, file.url, file.size);
        });
        updateStorageInfo();
    }

    loadFiles();
});
