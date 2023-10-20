import React, {useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {usePlaybackContext} from './PlaybackContext';

const VolumeContext = React.createContext(null);

function VolumeContextProvider({children}) {
    const {currentVideoPlayerRef} = usePlaybackContext();
    const [volume, setVolume] = useState(0);

    const updateVolume = useCallback(
        (newVolume) => {
            currentVideoPlayerRef.current.setStatusAsync({volume: newVolume});
            setVolume(newVolume);
        },
        [currentVideoPlayerRef],
    );

    const contextValue = useMemo(() => ({updateVolume, volume}), [updateVolume, volume]);
    return <VolumeContext.Provider value={contextValue}>{children}</VolumeContext.Provider>;
}

function useVolumeContext() {
    const context = React.useContext(VolumeContext);
    if (context === undefined) {
        throw new Error('useVolumeContext must be used within a PlaybackContextProvider');
    }
    return context;
}

VolumeContextProvider.displayName = 'EnvironmentProvider';
VolumeContextProvider.propTypes = {
    /** Actual content wrapped by this component */
    children: PropTypes.node.isRequired,
};

export {VolumeContextProvider, useVolumeContext};
