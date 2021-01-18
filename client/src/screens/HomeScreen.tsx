import React, { useState, useCallback, useEffect } from 'react';
import firebase from 'firebase';


const HomeScreen = () => {
    const [chosenImage, setChosenImage] = useState<File | null>(null);
    const [chosenImageSrc, setChosenImageSrc] = useState<string>("");
    const [isUploaded, setUploaded] = useState<boolean>(false);

    const storage = firebase.storage();

    const onChange = useCallback(e => {
        const file = e.target.files[0];
        if (file) {
            setChosenImage(file);
            setChosenImageSrc(URL.createObjectURL(file));
        }
    }, [setChosenImage, setChosenImageSrc]);

    const onUpload = useCallback(() => {
        if (!chosenImage || !chosenImage.name) return;
        const uid = firebase.auth().currentUser?.uid;
        if (!uid) return;
        const storageLocation = `${uid}/${chosenImage.name}`;
        const filename = chosenImage.name;
        const uploadTask = storage.ref(storageLocation).put(chosenImage);
        const updateMetadataTask = new Promise((resolve, reject) => (
            (url: string) => (
                storage.ref(storageLocation)
                    .child(filename)
                    .updateMetadata({
                        customMetadata: {
                            owner: uid,
                            downloadURL: url,
                        }
                    })
                    .then(() => resolve(true))
                    .catch(() => reject(false))
            )
        ));
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage.ref(storageLocation)
                    .getDownloadURL()
                    .then(url => (
                        storage.ref(storageLocation)
                            .updateMetadata({
                                customMetadata: {
                                    owner: uid,
                                    downloadURL: url,
                                }
                            })
                            .then(() => true)
                            .catch(() => false)
                    ))
                    .catch(() => false);
                setUploaded(true);
            }
        );
    }, [chosenImage, setUploaded]);

    /* eslint-disable react/jsx-no-target-blank */
    return (
        <div>
            <h3>1) CHOOSE FILE</h3>
            <input type="file" onChange={onChange} />
            <br />
            <h3>2) PREVIEW CHOSEN FILE</h3>
            {chosenImage && chosenImageSrc && (
                <>
                    <div>Local URL (used for preview): {chosenImageSrc}</div>
                    <p><a href={chosenImageSrc}>Open full preview (this window)</a></p>
                    <p><a href={chosenImageSrc} target="_blank">Open full preview (new window)</a></p>
                    <p><a href={chosenImageSrc} download={chosenImage.name}>Automatic Download</a></p>
                    <img alt="Chosen preview" src={chosenImageSrc} />
                </>
            )}
            <br />
            <h3>3) UPLOAD FILE TO FIREBASE</h3>
            <button onClick={onUpload}>Upload</button>
            <p>
                {isUploaded && "Your file is uploaded."}
            </p>
        </div>
    );

    return (
        <p>HomeScreen</p>
    );
}

export default HomeScreen;
