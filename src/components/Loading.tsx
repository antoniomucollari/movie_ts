import {ClipLoader} from "react-spinners";

export default function Loading() {
    return (
        <div style={{
            position: 'fixed', // position it over everything
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // optional: translucent white background
            zIndex: 9999 // ensure it's above everything
        }}>
            <ClipLoader size={40} color="#36d7b7" />
        </div>
    );
}

// other option
// export default function Loading() {
//     return (
//         // This div acts as a container to center the loader
//         <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%'
//         }}>
//             <ClipLoader size={40} color="#36d7b7" />
//         </div>
//     );
// }