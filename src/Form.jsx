import { useState } from "react";
import { useForm } from 'react-hook-form';
import Map from './Map'

export default function Form() {

    let [arrPlaces, setArrPlaces] = useState([]);//מערך המקומות המתקבלים מהשרת
    let [selectedPlace, setSelectedPlace] = useState({ lat: 32.086788, lon: 34.829101 });//המיקום שבחר המשתמש 

    // פונקציה המקבלת נתונים מהשרת בהתאם להקלדת המשתמש
    async function changeAddress(e) {

        const query = e.target.value; //הכתובת שהקיש המשתמש

        if (!query) {
            setArrPlaces([]);
            return;
        }

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
            const data = await response.json();
            const places = data.map(({ display_name, lat, lon }) => ({//מכניס את הנתונים מהשרת למערך
                lat,
                lon,
                placeName: display_name,
            }));
            setArrPlaces(places);
        }

        catch (err) {
            console.error("Error fetching address suggestions:", err);
        }
    }

    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm();

    //פונקציה המתרחשת בעת שליחת הטופס
    function save(data) {
        data.Status = "search"
        console.log(data);
        alert("נשלח בהצלחה");
        reset();
    }

    //פונקציה ששומרת ומציגה את המיקום שבחר המשתמש
    function chooseAddress(address) {
        setValue("Address", address.placeName);
        setSelectedPlace({ lat: address.lat, lon: address.lon });
        setArrPlaces([]);
    }

    return (
        <>
            <div className="container-form-max">
                <form className='form-style add-form' noValidate onSubmit={handleSubmit(save)}>
                    <div className="title">
                        <h1> Search office</h1>
                    </div>
                    <div>
                        {errors.UserName && <div className='err-message'> {errors.UserName.message} </div>}
                        <input type="text" placeholder="User Name"
                            {...register("UserName", { required: { value: true, message: "name is require" } })} />
                    </div>

                    <div>
                        {errors.Address && <div className='err-message'> {errors.Address.message} </div>}
                        <input
                            type="text"
                            placeholder="Address"
                            {...register("Address", {
                                required: { value: true, message: "Address is required" },
                                onChange: (e) => changeAddress(e)
                            })}
                        />
                    </div>
                    {arrPlaces.length > 0 && (
                        <div>
                            <ul className="place-list">
                                {arrPlaces.map((item, index) => (
                                    <li className="place-li" key={index} onClick={() => chooseAddress(item)}>
                                        {item.placeName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    )}


                    <div>
                        {errors.Phone && <div className='err-message'> {errors.Phone.message} </div>}
                        <input type="text" placeholder="Phone"
                            {...register("Phone", {
                                required: { value: true, message: "phone is require" },
                                maxLength: { value: 10, message: "the phone must be 9 or 10 digits" },
                                minLength: { value: 9, message: "the phone must be 9 or 10 digits" }
                            })} />
                    </div>

                    <div>
                        {errors.Email && <div className='err-message'> {errors.Email.message} </div>}
                        <input type="email" placeholder="Email"
                            {...register("Email", {
                                required: { value: true, message: "mail is require" },
                                pattern: { value: /^\S+@\S+$/i, message: "email is not in correct format" }
                            })} />
                    </div>

                    <div>
                        {errors.NumRooms && <div className='err-message'> {errors.NumRooms.message} </div>}
                        <input type="number" placeholder="Num Of Rooms"
                            {...register("NumRooms", {
                                required: { value: true, message: "num rooms is require" },
                                min: { value: 1, message: "you must choose at least one room" }
                            })} />
                    </div>

                    <div>
                        {errors.Distance && <div className='err-message'> {errors.Distance.message} </div>}
                        <input type="number" placeholder="Distance To Move"
                            {...register("Distance", {
                                required: { value: true, message: "distance is require" },
                                min: { value: 0, message: "you cant choose negative distance" }
                            })} />
                    </div>

                    <div>
                        <input type="checkbox"  {...register("NeedsInternet")} />
                        <label htmlFor="">Needs Internet</label>
                    </div>

                    <div>
                        <input type="checkbox"  {...register("NeedsKitchen")} />
                        <label htmlFor="">Needs Kitchen</label>
                    </div>

                    <div>
                        <input type="checkbox"  {...register("NeedsCoffeeMachine")} />
                        <label htmlFor="">Needs Coffee Machine</label>
                    </div>

                    <input type="submit" />

                </form>
                <div className="map">
                    <Map lat={selectedPlace.lat} lon={selectedPlace.lon} />
                </div>
            </div>
        </>
    );

}