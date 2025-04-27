import EditProperty from "../dashboard/EditProperty";
import PropertyForm from "./PropertyForm";
import { LoadScript } from '@react-google-maps/api';


export default function GoogleAPI(props) {

    const libraries = ['places'];
    console.log(props.componentToRender);

    let component;
    if (props.componentToRender === "Property_form") {
        console.log(props.componentToRender);
        component  = <PropertyForm />
    }
    else {
        console.log("inside edit");
        component = <EditProperty />
    }

    if (window.google) {
        return component
    }

    return (
        <LoadScript
            googleMapsApiKey="" // removed api key for security issues
            libraries={libraries}
        >
            {component}

        </LoadScript>
    )
}
