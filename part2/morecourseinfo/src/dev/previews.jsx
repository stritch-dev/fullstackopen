import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App";
import Course from "../Course";
import Courses from "../Courses";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Course">
                <Course/>
            </ComponentPreview>
            <ComponentPreview path="/Courses">
                <Courses/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;