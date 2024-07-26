import {COSEndpoint} from "~/consts";

export default function toSeatiCOSURL(resourceName: string, term: string | number) {
    return `${COSEndpoint}/uploads/ST${term}/${resourceName}`;
}