import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, Timestamp, onSnapshot, orderBy } from 'firebase/firestore';
import { db, storage } from '../firebase';

export interface ConvertedVideo {
  id?: string;
  name: string;
  url: string;
  groupId: number;
  createdAt: any;
}

export const useFirebase = () => {
  const [uploading, setUploading] = useState(false);

  const uploadVideo = async (fileBlob: Blob, fileName: string, groupId: number) => {
    setUploading(true);
    try {
      // 1. Upload to Firebase Storage
      const storageRef = ref(storage, `videos/group_${groupId}/${Date.now()}_${fileName}`);
      await uploadBytes(storageRef, fileBlob);
      const downloadURL = await getDownloadURL(storageRef);

      // 2. Save metadata to Firestore
      const docRef = await addDoc(collection(db, 'videos'), {
        name: fileName,
        url: downloadURL,
        groupId: groupId,
        createdAt: Timestamp.now()
      });

      return { id: docRef.id, url: downloadURL };
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const subscribeToVideos = (groupId: number, callback: (videos: ConvertedVideo[]) => void) => {
    const q = query(
      collection(db, 'videos'), 
      where('groupId', '==', groupId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const videos: ConvertedVideo[] = [];
      snapshot.forEach((doc) => {
        videos.push({ id: doc.id, ...doc.data() } as ConvertedVideo);
      });
      callback(videos);
    });
  };

  return { uploadVideo, subscribeToVideos, uploading };
};
