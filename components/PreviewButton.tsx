function PreviewButton() {
	return (
		<button className="bg-white flex justify-center items-center gap-1 px-3 py-2 rounded-lg h-fit text-lg leading-[22px] font-medium text-black font-Inter absolute top-5 right-4 hover:bg-gray-100 border border-gray-200 shadow-md">
			<div>Preview</div>
			<img
				src="/images/PreviewButton/heroicons-outline/play.svg"
				alt="heroicons-outline/play"
				className="h-6 w-6"
			/>
		</button>
	);
}
export default PreviewButton;
