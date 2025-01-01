import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapView({ lat, lon }) {

    const map = useMap();  //  יוצר אובייקט מפה
    useEffect(() => {
        map.setView([lat, lon]);  //משנה את תצוגת המפה לפי המיקום החדש
    }, [lat, lon, map]);  // נעדכן כל פעם שה- לאט או ה- לון משתנים
}