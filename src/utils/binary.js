export const typedArrayToUint8Array = (typedArray) =>
    new Uint8Array(typedArray.buffer.slice(typedArray.byteOffset, typedArray.byteOffset + typedArray.byteLength));
