
import { useContentStore } from '../store/content'
import axios from 'axios'
import { useEffect, useState } from 'react'


const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)
    const { contentType } = useContentStore()

    useEffect(() => {
        const getTrendingContent = async () => {
            try {
                const res = await axios.get(`/api/${contentType}/trending`)
                setTrendingContent(res.data.content)
            } catch (error) {
                console.error("Error fetching trending content:", error)
            }
        }
        getTrendingContent()


    }, [contentType])
    return { trendingContent }

}

export default useGetTrendingContent
