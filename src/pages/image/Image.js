import {useEffect, useState} from 'react';
import {getQueryParams} from '../../utils/location';
import './Image.scss'
import {Link} from 'react-router-dom';

export function Image() {
    const [path, setPath] = useState('');
    const [size, setSize] = useState({
        width: '0',
        height: '0'
    })
    const [tag, setTag] = useState('')
    useEffect(() => {
        const params = getQueryParams()
        setPath(params.get('image'))

        const height = params.get('height');
        const width = params.get('width');
        setSize({width, height})

        const tag = params.get('tag');
        setTag(tag)
    }, [])

    async function downloadImage(imageSrc) {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = ''
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <Link className='main-link' to='/'>На главную</Link>
            <div className='image-page'>
                <div className="image-page__img-wrapper">
                    <img
                        className='image-page__img'
                        src={path}
                        alt="tag"/>
                </div>
                <div className='image-page__about-wrapper'>
                    <p className='image-page__info'>Размер: {`${size.width} x ${size.height}`}</p>
                    <p className='image-page__info'>tag: {tag}</p>
                    <div className='image-page__link-wrapper'>
                        <button className='image-page__link'
                                onClick={() => {
                                    downloadImage(path)
                                }}
                        >Скачать
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
