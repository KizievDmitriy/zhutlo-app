'use client';
import Image from "next/image";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, locationValue, imageSrc, id, currentUser }) => {

		const { getByValue } = useCountries();

		const location = getByValue(locationValue);
	return (
		<>
      <Heading
        center
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          src={!imageSrc ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019' : imageSrc}
          fill
          className="object-cover w-full h-full bg-slate-300"
          alt="Image"
        />
        <div className='absolute top-5 right-5'>
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
	)
}

export default ListingHead