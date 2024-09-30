
interface FieldSize {
    width: number;
    height: number;
}

interface BallPosition {
    x: number;
    y: number;
}

interface Direction {
    x: number;
    y: number;
}

type Callback = (newBarPosition: number) => void;

class GhostService {

    private subscribers: Callback[] = [];

    calculateBarPosition(ballPosition: BallPosition, direction: Direction, fieldSize: FieldSize): number {
        
        if (direction.x === 1) {
            const m = direction.y / direction.x;
            const c = ballPosition.y - m * ballPosition.x;

            const xImpacto = fieldSize.width;
            const yImpacto = m * xImpacto + c;

            const newBarPosition = Math.max(0, Math.min(fieldSize.height - 128, yImpacto - 128 / 2));
            this.notifySubscribers(newBarPosition);
        }
        return -1;
    }

    subscribe(callback: Callback) {
        this.subscribers.push(callback);
    }

    private notifySubscribers(newBarPosition: number) {
        this.subscribers.forEach(callback => callback(newBarPosition));
    }
}

export default new GhostService();