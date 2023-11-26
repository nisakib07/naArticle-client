const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-3xl font-bold">{heading}</h2>
      <p className="mt-4 text-lg">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
