import React from "react";
    
function Image({ src }) {
    const defaultNoImageSrc = 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg';
    return (
        <img
            src={src || defaultNoImageSrc}
            style={{
                maxWidth: 100,
                maxHeight: "auto"
            }}
            alt={src? "alt" : "No image available"}
        />
    );
}

export default Image;