import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>
        Этот маршрут
        <br />
        <em>ещё не открыт.</em>
      </h1>
      <p>Вернёмся туда, где начинаются новые возможности.</p>
      <ButtonLink href="/">На главную</ButtonLink>
    </section>
  );
}
