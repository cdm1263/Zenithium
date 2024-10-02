const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end mb-4">
      <h3 className="text-3xl font-semibold xs:mr-2">{title}</h3>
      <span className="text-muted-foreground">{description}</span>
    </div>
  );
};

export default SectionTitle;
