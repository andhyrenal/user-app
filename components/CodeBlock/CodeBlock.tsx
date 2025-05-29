const CodeBlock = (props: { value: string }) => {
    return (
        <pre className="w-full overflow-auto rounded">
            <code className="block w-full text-sm">
                {props.value}
            </code>
        </pre>
    )
}

export default CodeBlock;