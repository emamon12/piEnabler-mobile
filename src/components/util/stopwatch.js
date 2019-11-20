import * as React from "react";
import ReactStopwatch from "react-stopwatch";

const Stopwatch = () => (
    <ReactStopwatch
        seconds={0}
        minutes={0}
        hours={0}
        render={({ formatted, hours, minutes, seconds }) => {
            return (
                <div>
                    <p>Polling Status: OPEN</p>
                    <p> {formatted}</p>
                </div>
            );
        }}
    />
);

export default Stopwatch;
