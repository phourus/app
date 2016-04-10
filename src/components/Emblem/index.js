import React from 'react';

const Emblem = (props) => {
    const slide = props.slide || 0;
    const faded = props.faded || 0.4;
    const width = props.width || 100;

    let opacity = 1;
    let o = [];
    if (slide !== 0) {
        opacity = faded;
    }
    o = [1, opacity, opacity, opacity, opacity];
    if (slide > 0) {
        o[slide] = 1;
    }
    return (
        <div className="emblem">
            <svg width={width} version="1.1" id="Logo" x="0px" y="0px" viewBox="20 114 560 560" enable-background="new 20 114 560 560">
                <g>
                    <g onClick={props.red}>
                        <path fill="#ED0303" opacity={o[3]} d="M170.3,506.2c6.1-63.2,56.1-112.2,119.3-119.3c-4.1-58.1-52-104-111.2-104c-61.2,0-111.2,50-111.2,111.2
                            C66.3,453.1,112.2,502.1,170.3,506.2z"/>
                    </g>
                    <g onClick={props.gold}>
                        <path fill="#ECB010" opacity={o[4]} d="M191.8,261.4c63.2,6.1,112.2,56.1,119.3,119.3c58.1-4.1,104-52,104-111.2c0-61.2-50-111.2-111.2-111.2
                            C244.8,157.3,195.8,203.2,191.8,261.4z"/>
                    </g>
                    <g onClick={props.blue}>
                        <path fill="#3498DB" opacity={o[2]} d="M317.2,402.1c4.1,58.1,52,104,111.2,104c61.2,0,111.2-50,111.2-111.2c0-59.2-45.9-107.1-104-111.2
                            C430.4,346,380.5,396,317.2,402.1z"/>
                    </g>
                    <g onClick={props.green}>
                        <path fill="#8ABF00" opacity={o[1]} d="M415.1,527.6c-63.2-6.1-112.2-56.1-119.3-119.3c-58.1,4.1-104,52-104,111.2c0,61.2,50,111.2,111.2,111.2
                            C362.1,631.6,411.1,585.7,415.1,527.6z"/>
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default Emblem;
