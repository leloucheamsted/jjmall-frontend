const TagsInput = () => {
    const [tags, setTags] = useState([])

    function handleKeyDown(e) {
        // If user did not press enter key, return
        if (e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if (!value.trim()) return
        // Add the value to the tags array
        setTags([...tags, value])
        // Clear the input
        e.target.value = ''
    }

    return (
        <div className="basis-1/2 bg-red-300  mb-5 xl:pr-2  w-full flex items-center flex-wrap">
            eerr
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close">&times;</span>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="border-none outline-none flex-grow" placeholder="Type somthing" />
        </div>
    );
}
export default TagsInput;