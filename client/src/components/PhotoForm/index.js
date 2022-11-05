import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PHOTO } from '../../utils/mutations';
import { QUERY_PHOTOS, QUERY_ME } from '../../utils/queries';

const PhotoForm = () => {
    const [photoText, setText] = useState('');
    const [photoPlace, setPlace] = useState('');
    const [photoLink, setPic] = useState('');

    const [characterCount, setCharacterCount] = useState(0);
    const [addPhoto, { error }] = useMutation(ADD_PHOTO, {
        update(cache, { data: { addPhoto } }) {

            // could potentially not exist yet -> try/catch
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
            if (event.target.id === "photo-text") {
                setText(event.target.value);
                setCharacterCount(event.target.value.length);
            }
            else if (event.target.id === "picLink-text") {
                setPic(event.target.value);
            }
            else if (event.target.id === "place-text") {
                setPlace(event.target.value);
            }
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add photo to database
            await addPhoto({
                variables: { photoText , photoPlace, photoLink}
            });

            // clear form value
            setText('');
            setPlace('');
            setPic('');

            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count for photo text: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}>
                <div>
                    <textarea
                        placeholder="Insert Place..."
                        value={photoPlace}
                        id="place-text"
                        className="form-input col-12 col-md-9"
                        onChange={handleChange}
                    ></textarea>
                    <textarea
                        placeholder="Insert Link for Pic..."
                        value={photoLink}
                        id="picLink-text"
                        className="form-input col-12 col-md-9"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <textarea
                    placeholder="Insert Photo Text: Any background story or your vacation memories for the photo that you want to share with others"
                    value={photoText}
                    id="photo-text"
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>


                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PhotoForm;