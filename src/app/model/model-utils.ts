export class ModelUtils {

    /**
     * Generates a random int for use as IDs.
     */
    public static generateRandomId(): number {
        return Math.random() * 1000000000000000000;
    }
}
