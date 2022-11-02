import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PHOTO } from '../../utils/mutations';
import { QUERY_PHOTOS, QUERY_ME } from '../../utils/queries';

const PhotoForm = () => {
    const [photoText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addPhoto, { error }] = useMutation(ADD_PHOTO, {
        update(cache, { data: { addPhoto } }) {

            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, photos: [...me.photos, addPhoto] } },
                });
            } catch (e) {
                console.warn("First photo insertion by user!")
            }

            // update photo array's cache
            const { photos } = cache.readQuery({ query: QUERY_PHOTOS });
            cache.writeQuery({
                query: QUERY_PHOTOS,
                data: { photos: [addPhoto, ...photos] },
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add photo to database
            await addPhoto({
                variables: { photoText }
            });

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Here's a new photo..."
                    value={photoText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <div>
                    <textarea
                        placeholder="Insert Place..."
                        // value={photoPlace}
                        className="form-input col-12 col-md-9"
                    // onChange={handleChange}
                    ></textarea>
                    <textarea
                        placeholder="Insert Link for Pic..."
                        // value={photoPic}
                        className="form-input col-12 col-md-9"
                    // onChange={handleChange}
                    ></textarea>
                </div>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PhotoForm;