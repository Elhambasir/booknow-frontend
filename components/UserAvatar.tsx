import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface Props {
  imageUrl: string;
  fullName: string; // full name
  alt: string;
}

export default function UserAvatar({ imageUrl, fullName, alt }: Props) {
  // Extract first letters from first and last name
  const initials = fullName
    ?.trim()
    .split(/\s+/) // split by spaces
    .map(word => word.charAt(0).toUpperCase()) // take first letter of each word
    .slice(0, 2) // max two letters
    .join("") ?? "";

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={alt} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
