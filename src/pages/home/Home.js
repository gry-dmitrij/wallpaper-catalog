import {useCallback, useEffect, useState} from 'react';
import {getPhotoList} from '../../api/photos';
import './Home.scss'
import {Tags} from '../../components/tags/Tags';
import {Link} from 'react-router-dom';
import {Loader} from '../../components/loader/Loader';

const minImagesAmount = 20

export function Home() {
    const [loading, setLoading] = useState(false)
    const [fetchMore, setFetchMore] = useState(false)
    const [loadingAmount, setLoadingAmount] = useState(0)
    const [list, setList] = useState([])
    const [tag, setTag] = useState('dog')

    const onScroll = useCallback(() => {
        if (fetchMore || loading) {
            return
        }
        const document = window.document.documentElement;
        if (document.scrollHeight - document.scrollTop - document.clientHeight < 500) {
            console.log('onScroll set fetch more')
            setFetchMore(true)
        }
    }, [fetchMore, loading])

    const addPhotos = useCallback(() => {
        if (loading) {
            return
        }
        setLoading(true)
        getPhotoList(minImagesAmount, list.length, tag)
            .then(data => {
                setList([...list, ...data])
                setFetchMore(false)
            })
    }, [loading, list, tag])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [onScroll])

    useEffect(() => {
        setList([])
        setFetchMore(true)
    }, [tag])

    useEffect(() => {
        if (!fetchMore) {
            return
        }
        addPhotos()
    }, [fetchMore, addPhotos])

    useEffect(() => {
        if (loading) {
            return
        }
        onScroll()
    }, [loading, onScroll])

    function tagChanged(name) {
        setTag(name)
    }

    function getLink(image) {
        const url = '/image';
        const searchParams = new URLSearchParams();
        searchParams.append('image', image.file);
        searchParams.append('height', image.height);
        searchParams.append('width', image.width);
        searchParams.append('tag', image.tags);
        return url + '?' + searchParams.toString()
    }

    function onLoading() {
        setLoadingAmount(prevState => prevState + 1)
    }

    useEffect(() => {
        if (loadingAmount && loadingAmount === list.length) {
            setLoading(false)
        }
    }, [loadingAmount, list])

    return (
        <div className='home'>
            <h1>Каталог обоев</h1>
            <Tags changed={tagChanged}/>
            <div className='home__gallery'>
                {list.map((item, idx) => (
                    // пришлось поставить idx в качестве ключа, т.к иногда прилетают одинаковые фото
                    // с одинаковым url, больше нет ничего уникального
                    <Link to={getLink(item)} href={item.file} key={idx}><img className='home__img' src={item.file} width={320} onLoad={() => {
                        onLoading()
                    }} alt={item.tag}/></Link>
                ))}
                {fetchMore && <div className='home__loader-wrapper'><Loader /></div>}
            </div>

        </div>
    )
}
