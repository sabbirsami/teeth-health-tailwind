import { format } from "date-fns";
import { useQuery } from "react-query";
import React, { useState } from "react";
import AppointmentService from "./AppointmentService";
import BookingModal from "./BookingModal";
import Loading from "../Shared/Loading";

const AvailableAppointment = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const formattedDate = format(date, "PP");
    const {
        isLoading,
        error,
        refetch,
        data: services,
    } = useQuery(["available", formattedDate], () =>
        fetch(
            `https://teeth-health.herokuapp.com/available?date=${formattedDate}`
        ).then((res) => res.json())
    );
    if (isLoading) {
        return <Loading></Loading>;
    }
    if (error) {
        console.log(error);
    }
    // useEffect(() => {
    //     fetch(`https://teeth-health.herokuapp.com/available?date=${formattedDate}`)
    //         .then((res) => res.json())
    //         .then((data) => setServices(data));
    // }, [formattedDate]);
    return (
        <div className="container mx-auto">
            <h5 className="text-2xl text-green-500 pb-8 pt-16 lg:pl-16 pl-4">
                Available Appointment on {format(date, "PP")}
            </h5>
            <div className="py-16">
                <div className="grid grid-col-1 md:grid-cols-2  lg:grid-cols-3 gap-8 px-14">
                    {services.map((service) => (
                        <AppointmentService
                            key={service._id}
                            service={service}
                            setTreatment={setTreatment}
                        ></AppointmentService>
                    ))}
                </div>
                {treatment && (
                    <BookingModal
                        date={date}
                        treatment={treatment}
                        setTreatment={setTreatment}
                        refetch={refetch}
                    ></BookingModal>
                )}
            </div>
        </div>
    );
};

export default AvailableAppointment;
