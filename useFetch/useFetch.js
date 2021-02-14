import { useEffect, useRef, useState } from 'react'

const useFetch = (url) => {
  const isMounted = useRef(true)
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setState({ data: null, loading: true, error: null })
    ;(async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        isMounted.current
          ? setState({
              data,
              loading: false,
              error: null,
            })
          : console.log('setState no se llamó.')
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar al info.',
        })
      }
    })()
  }, [url])

  return state
}

export default useFetch
