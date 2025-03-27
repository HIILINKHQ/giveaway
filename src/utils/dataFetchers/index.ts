import _getRoom from "./getRoom";
import _getRooms from "./getRooms";

// const API_BASE_URI = "https://frostbyte-api.vercel.app/api"
const API_BASE_URI = process?.env?.NEXT_PUBLIC_API_URI ?? "";

const getRooms = () => _getRooms(API_BASE_URI);
const getRoom = (roomId: string) => _getRoom(API_BASE_URI, roomId);

export { getRooms, getRoom };
