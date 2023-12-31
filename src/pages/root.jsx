import { Link, Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../services/contacts";

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const contacts = await getContacts(search);
    return { contacts, search };
}

export default function Root() {
    const { contacts, search } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "search"
        );

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="search"
                            defaultValue={search}
                            onChange={(event) => {
                                const isFirstSended = search == null;

                                submit(event.currentTarget.form, {
                                    replace: !isFirstSended
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="POST">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                                    >

                                        <div>
                                            <Link to={`contacts/${contact.id}`}>
                                                {contact.first || contact.last ? (
                                                    <>
                                                        {contact.first} {contact.last}
                                                    </>
                                                ) : (
                                                    <i>No Name</i>
                                                )}{" "}
                                                {contact.favorite && <span>★</span>}
                                            </Link>
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </div >
        </>
    );
}